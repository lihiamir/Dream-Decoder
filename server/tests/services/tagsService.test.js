const { processDreamTags, cosineSimilarity, extractTagsOnly } = require('../../services/tags');

// Mock OpenAI SDK behavior for embedding and chat completion
jest.mock('openai', () => {
  const mockCreate = jest.fn(() => Promise.resolve({
    choices: [{
      message: {
        content: JSON.stringify({ tags: ['forest', 'night', 'escape'] })
      }
    }]
  }));

  return {
    OpenAI: jest.fn().mockImplementation(() => ({
      embeddings: {
        create: jest.fn(({ input }) => Promise.resolve({
          // Same embedding for all
          data: input.map(() => ({ embedding: [0.1, 0.2, 0.3] }))
        }))
      },
      chat: {
        completions: {
          // Used by extractTagsOnly
          create: mockCreate
        }
      }
    })),
    // Expose for test override
    __mockCreate: mockCreate
  };
});

describe('processDreamTags', () => {
  test('returns mean tag embedding', async () => {
    // Simulate average embedding calculation
    const result = await processDreamTags(['Rabbit', 'Mirror']);
    expect(result).toHaveProperty('tagEmbedding');
    // Mocked value
    expect(result.tagEmbedding).toEqual([0.1, 0.2, 0.3]);
  });
});

describe('cosineSimilarity', () => {
  test('returns 1 for identical vectors', () => {
    // Vectors pointing in same direction, so similarity = 1
    const a = [1, 2, 3];
    const b = [1, 2, 3];
    expect(cosineSimilarity(a, b)).toBeCloseTo(1);
  });

  test('returns 0 for orthogonal vectors', () => {
    // Perpendicular vectors, so similarity = 0
    const a = [1, 0];
    const b = [0, 1];
    expect(cosineSimilarity(a, b)).toBeCloseTo(0);
  });
});

describe('extractTagsOnly', () => {
  test('calls GPT and returns parsed tags', async () => {
    const scenes = ['I saw a rabbit', 'There was a mirror in the forest'];
    // Should parse mocked GPT response
    const result = await extractTagsOnly(scenes);
    expect(result).toEqual({ tags: ['forest', 'night', 'escape'] });
  });

  test('throws on invalid JSON', async () => {
    const { __mockCreate } = require('openai');

    // Simulate GPT returning malformed JSON
    __mockCreate.mockReturnValueOnce(Promise.resolve({
      choices: [{ message: { content: 'not valid JSON' } }]
    }));

    await expect(extractTagsOnly(['test'])).rejects.toThrow('Invalid JSON from GPT');
  });
});
