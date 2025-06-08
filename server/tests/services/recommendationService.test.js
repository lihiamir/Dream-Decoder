// test file
const { getRecommendedDreamsForUser } = require('../../services/recommendation');

jest.mock('firebase-admin', () => ({
  firestore: () => ({
    collection: jest.fn(() => ({
      doc: jest.fn((id) => ({
        get: jest.fn(() => Promise.resolve({
          exists: true,
          data: () => ({ tagEmbedding: [0.1, 0.2, 0.3] })
        }))
      })),
      get: jest.fn(() => Promise.resolve({
        forEach: (cb) => {
          cb({ id: 'dream2', data: () => ({ tagEmbedding: [0.1, 0.2, 0.3], scenes: [{ image: 'url' }] }) });
          cb({ id: 'dream3', data: () => ({ tagEmbedding: [0.9, 0.9, 0.9], scenes: [] }) });
        }
      }))
    }))
  })
}));

describe('getRecommendedDreamsForUser', () => {
  test('returns recommended dreams with image if cosine similarity >= threshold', async () => {
    const result = await getRecommendedDreamsForUser('uid123', 'dream1');
    expect(result).toEqual([{ id: 'dream2', image: 'url' }]);
  });

  test('throws if target dream does not exist', async () => {
    const admin = require('firebase-admin');
    const fakeRef = admin.firestore().collection().doc();
    fakeRef.get = jest.fn().mockResolvedValue({ exists: false });

    await expect(getRecommendedDreamsForUser('uid123', 'dream1')).rejects.toThrow('Dream not found');
  });
});
