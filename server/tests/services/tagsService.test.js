// test file
const { processDreamTags, cosineSimilarity } = require('../../services/tags');
const fs = require('fs');

jest.mock('fs');
jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    embeddings: {
      create: jest.fn(({ input }) => Promise.resolve({
        data: input.map(() => ({ embedding: [0.1, 0.2, 0.3] }))
      }))
    }
  }))
}));

describe('processDreamTags', () => {
  test('returns knnVector and meanEmbedding', async () => {
    fs.readFileSync.mockReturnValue(JSON.stringify({
      rabbit: [0.1, 0.2, 0.3],
      mirror: [0.1, 0.2, 0.3]
    }));

    const result = await processDreamTags(['Rabbit', 'Mirror']);
    expect(result.knnVector).toEqual([1, 1]);
    expect(result.meanEmbedding).toEqual([0.1, 0.2, 0.3]);
  });
});

describe('cosineSimilarity', () => {
  test('returns 1 for identical vectors', () => {
    const a = [1, 2, 3];
    const b = [1, 2, 3];
    expect(cosineSimilarity(a, b)).toBeCloseTo(1);
  });

  test('returns 0 for orthogonal vectors', () => {
    const a = [1, 0];
    const b = [0, 1];
    expect(cosineSimilarity(a, b)).toBeCloseTo(0);
  });
});
