// tests/services/dreamsService.test.js

const dreamsService = require('../../services/dreams');

// Mock Firestore structure
jest.mock('../../config/firebase', () => {
  const get = jest.fn().mockResolvedValue({
    exists: true,
    data: () => ({
      background: 'Test',
      interpretationStyle: 'Symbolic',
      scenes: [{ scene: 'A forest', image: 'url1' }],
      tags: ['nature'],
      createdAt: { toDate: () => new Date() }
    })
  });

  const dreamsCollection = {
    orderBy: jest.fn(() => ({
      get: jest.fn().mockResolvedValue({ docs: [] }) // getAllDreams
    }))
  };

  const dreamDoc = {
    get, // for getDreamById
    collection: jest.fn(() => dreamsCollection) // for getAllDreams
  };

  const collection = jest.fn(() => ({
    doc: jest.fn(() => dreamDoc)
  }));

  return {
    admin: {
      firestore: () => ({
        collection
      })
    }
  };
});

describe('dreamsService.getAllDreams', () => {
  test('should return empty array when no dreams exist', async () => {
    const result = await dreamsService.getAllDreams('fake_uid');
    expect(result).toEqual([]);
  });
});

describe('dreamsService.getDreamById', () => {
  test('should return dream with scenes if it exists', async () => {
    const result = await dreamsService.getDreamById('fake_uid', 'dream123');
    expect(result).toHaveProperty('id', 'dream123');
    expect(Array.isArray(result.scenes)).toBe(true);
  });
});
