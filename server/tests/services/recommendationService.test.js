// test file
const { getRecommendedDreamsForUser } = require('../../services/recommendation');
const { cosineSimilarity } = require('../../services/tags');

jest.mock('../../services/tags', () => ({
  cosineSimilarity: jest.fn()
}));

jest.mock('firebase-admin', () => {
  const dreamDocs = {
    dream1: {
      exists: true,
      data: () => ({ tagEmbedding: [0.1, 0.2, 0.3] }),
    },
    dream2: {
      exists: true,
      data: () => ({
        tagEmbedding: [0.1, 0.2, 0.3],
        scenes: [{ image: 'url' }]
      }),
    },
    dream3: {
      exists: true,
      data: () => ({
        tagEmbedding: [0.9, 0.9, 0.9],
        scenes: []
      }),
    },
    nonexistent: {
      exists: false,
      data: () => null,
    }
  };

  return {
    firestore: () => ({
      collection: (collectionName) => ({
        doc: (uid) => ({
          collection: (subCollectionName) => ({
            doc: (dreamId) => ({
              get: jest.fn().mockResolvedValue(dreamDocs[dreamId] || { exists: false })
            }),
            get: jest.fn().mockResolvedValue({
              forEach: (cb) => {
                Object.entries(dreamDocs).forEach(([id, val]) => {
                  if (id !== 'dream1' && val.exists) {
                    cb({
                      id,
                      data: val.data
                    });
                  }
                });
              }
            })
          })
        })
      })
    })
  };
});

describe('getRecommendedDreamsForUser', () => {
  beforeEach(() => {
    cosineSimilarity.mockImplementation((a, b) => {
      // dream2 is similar (same embedding), dream3 is not
      if (JSON.stringify(b) === JSON.stringify([0.1, 0.2, 0.3])) return 0.95;
      return 0.3;
    });
  });

  test('returns recommended dreams with image if cosine similarity >= threshold', async () => {
    const result = await getRecommendedDreamsForUser('uid123', 'dream1');
    expect(result).toEqual([{ id: 'dream2', image: 'url' }]);
  });

  test('throws if target dream does not exist', async () => {
    const { firestore } = require('firebase-admin');
    firestore().collection().doc().get = jest.fn().mockResolvedValue({ exists: false });

    await expect(getRecommendedDreamsForUser('uid123', 'nonexistent')).rejects.toThrow('Dream not found');
  });
});
