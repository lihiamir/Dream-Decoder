const { classifyDreamMood } = require('../../services/mood');

// Mock the OpenAI module
jest.mock('openai', () => {
  const mockCreate = jest.fn();

  return {
    OpenAI: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreate
        }
      }
    })),
    __mockCreate: mockCreate
  };
});

describe('classifyDreamMood', () => {
  beforeEach(() => {
    const { __mockCreate } = require('openai');
    __mockCreate.mockReset();
  });

  test('returns parsed mood object with correct structure', async () => {
    const { __mockCreate } = require('openai');

    const mockResponse = JSON.stringify({
      dreamMood: "positive",
      sceneMoods: ["neutral", "positive", "negative"],
      tags: ["rabbit", "field", "freedom", "acceptance", "joy"]
    });

    __mockCreate.mockReturnValueOnce(Promise.resolve({
      choices: [{ message: { content: mockResponse } }]
    }));

    const scenes = [
      "I was running in a field.",
      "I saw a bright light and felt peace.",
      "Then the sky turned dark and I felt chased."
    ];

    const result = await classifyDreamMood(scenes);

    expect(result).toHaveProperty('dreamMood', 'positive');
    expect(Array.isArray(result.sceneMoods)).toBe(true);
    expect(Array.isArray(result.tags)).toBe(true);
    expect(result.sceneMoods.length).toBe(3);
    expect(result.tags.length).toBeGreaterThanOrEqual(5);
  });

  test('throws error on invalid JSON response', async () => {
    const { __mockCreate } = require('openai');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    __mockCreate.mockReturnValueOnce(Promise.resolve({
      choices: [{ message: { content: 'this is not valid JSON' } }]
    }));

    await expect(classifyDreamMood(['scene 1', 'scene 2']))
      .rejects
      .toThrow('Invalid JSON from GPT');

    expect(consoleSpy).toHaveBeenCalledWith(
      "❌ Failed to parse GPT response:",
      "this is not valid JSON"
    );

    consoleSpy.mockRestore();
  });

  test('sends correct prompt format to OpenAI', async () => {
    const { __mockCreate } = require('openai');

    const scenes = ["I was falling", "I woke up in a cave"];
    const expectedUserPrompt = `Scenes:\n1. I was falling\n2. I woke up in a cave`;

    const mockResponse = JSON.stringify({
      dreamMood: "neutral",
      sceneMoods: ["negative", "neutral"],
      tags: ["falling", "darkness", "confusion"]
    });

    const mockFn = jest.fn().mockResolvedValue({
      choices: [{ message: { content: mockResponse } }]
    });

    __mockCreate.mockReturnValueOnce(mockFn());

    await classifyDreamMood(scenes);

    const callArgs = __mockCreate.mock.calls[0][0].messages;
    const userMessage = callArgs.find(m => m.role === 'user');
    expect(userMessage.content).toBe(expectedUserPrompt);
  });
});
