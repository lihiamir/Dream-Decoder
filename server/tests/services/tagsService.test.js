const { processDreamTags, cosineSimilarity, extractTagsOnly } = require('../../services/tags');

jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    embeddings: {
      create: jest.fn(({ input }) => Promise.resolve({
        data: input.map(() => ({ embedding: [0.1, 0.2, 0.3] }))
      }))
    },
    chat: {
      completions: {
        create: jest.fn(() => Promise.resolve({
          choices: [{
            message: {
              content: JSON.stringify({ tags: ['forest', 'night', 'escape'] })
            }
          }]
        }))
      }
    }
  }))
}));

describe('processDreamTags', () => {
  test('returns mean tag embedding', async () => {
    const result = await processDreamTags(['Rabbit', 'Mirror']);
    expect(result).toHaveProperty('tagEmbedding');
    expect(result.tagEmbedding).toEqual([0.1, 0.2, 0.3]);
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

describe('extractTagsOnly', () => {
  test('calls GPT and returns parsed tags', async () => {
    const scenes = ['I saw a rabbit', 'There was a mirror in the forest'];
    const result = await extractTagsOnly(scenes);
    expect(result).toEqual({ tags: ['forest', 'night', 'escape'] });
  });

  test('throws on invalid JSON', async () => {
    const { OpenAI } = require('openai');
    OpenAI.mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn(() => Promise.resolve({
            choices: [{
              message: {
                content: 'not valid JSON'
              }
            }]
          }))
        }
      }
    }));

    await expect(extractTagsOnly(['test'])).rejects.toThrow('Invalid JSON from GPT');
  });
});
