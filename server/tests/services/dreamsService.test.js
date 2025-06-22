const dreamsService = require('../../services/dreams');

// Mock extractScenes to simulate scene extraction from GPT
jest.mock('../../services/chat', () => ({
  extractScenes: jest.fn().mockResolvedValue(`Number of scenes: 2

1. Scene description 1: A forest at night
2. Scene description 2: A beach with stars`)
}));

// Mock symbol extraction to return fixed symbols per scene
jest.mock('../../services/symbol', () => ({
  extractSymbolInterpretations: jest.fn().mockResolvedValue([
    { scene: 'A forest at night', symbols: [{ symbol: 'tree', meaning: 'growth' }] },
    { scene: 'A beach with stars', symbols: [{ symbol: 'star', meaning: 'hope' }] }
  ])
}));

// Mock tags extraction and processing
jest.mock('../../services/tags', () => ({
  extractTagsOnly: jest.fn().mockResolvedValue({ tags: ['forest', 'night'] }),
  processDreamTags: jest.fn().mockResolvedValue({ tagEmbedding: [0.1, 0.2, 0.3] })
}));

// Mock image generation for 2 scenes
jest.mock('../../services/image', () => ({
  generateAndUploadImage: jest.fn()
    .mockResolvedValueOnce('image1.png')
    .mockResolvedValueOnce('image2.png')
}));

// Mock Firestore interaction through Firebase admin SDK
jest.mock('../../config/firebase', () => {

  const dreamByIdDoc = (id) => ({
    get: jest.fn().mockResolvedValue({
      exists: true,
      id,
      data: () => ({
      scenes: [{
        scene: 'A forest at night',
        image: 'image1.png',
        symbols: [{ symbol: 'tree', meaning: 'growth' }]
      }]
    })
    })
  });

  const dreamsCollection = {
  doc: jest.fn((id) => {
    if (id === 'dream456') return dreamByIdDoc(id); 
    return {
      id: 'dream123',
      set: jest.fn().mockResolvedValue(true)
    };
  }),
    orderBy: jest.fn(() => ({
      get: jest.fn().mockResolvedValue({
        docs: [{
          id: 'dream456',
          data: () => ({
            createdAt: { toDate: () => new Date('2024-01-01') },
            scenes: [{ image: 'image1.png' }],
            tags: ['symbolic']
          })
        }]
      })
    }))
  };

  const userDoc = {
    get: jest.fn().mockResolvedValue({
      exists: true,
      data: () => ({
        background: 'Test',
        interpretationStyle: 'Symbolic'
      })
    }),
    collection: jest.fn((name) => {
      if (name === 'dreams') return dreamsCollection;
      return null;
    })
  };

  return {
    admin: {
      firestore: () => ({
      collection: jest.fn((name) => {
        return {
          doc: jest.fn((id) => {
            if (name === 'users' && id === 'uid123') return userDoc;
            return null;
          })
        };
      })
      })
    }
  };
});

// Tests
describe('processTextDream', () => {
  test('should process and save dream correctly', async () => {
    // Simulate full dream flow
    const result = await dreamsService.processTextDream('uid123', 'I was in a forest, then at the beach.');

    expect(result.id).toBe('dream123');
    expect(result.scenes.length).toBe(2);
    expect(result.scenes[0]).toMatchObject({
      scene: 'A forest at night',
      image: 'image1.png',
      symbols: [{ symbol: 'tree', meaning: 'growth' }]
    });
  });
});

describe('getAllDreams', () => {
  // Return simplified dream list for user
  test('should return formatted dream list', async () => {
    const result = await dreamsService.getAllDreams('uid123');
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({
      id: 'dream456',
      image: 'image1.png',
      tags: ['symbolic']
    });
  });
});


describe('getDreamById', () => {
  test('should return dream scenes if dream exists', async () => {
    // Return simplified dream list for user
    const result = await dreamsService.getDreamById('uid123', 'dream456');
    expect(result).toEqual({
      id: 'dream456',
      scenes: [{
        scene: 'A forest at night',
        image: 'image1.png',
        symbols: [{ symbol: 'tree', meaning: 'growth' }]
      }]
    });
  });
});