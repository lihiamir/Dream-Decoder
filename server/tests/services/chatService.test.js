const { extractScenes, findSymbolsFromGPT } = require('../../services/chat');

// Mock the OpenAI module and expose the completion.create mock for control
jest.mock('openai', () => {
  const mockCreate = jest.fn();

  return {
    OpenAI: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          // Main function to mock GPT responses
          create: mockCreate
        }
      }
    })),
    // Expose the mock for use in tests
    __mockCreate: mockCreate
  };
});

describe('extractScenes', () => {
  beforeEach(() => {
    // Clear any previous mock return values before each test
    const { __mockCreate } = require('openai');
    __mockCreate.mockReset();
  });

  test('returns scene list from GPT response', async () => {
    const { __mockCreate } = require('openai');

    // Simulate GPT returning a correctly formatted scene breakdown
    const mockContent = `
Number of scenes: 3

1. A dark forest with glowing mushrooms  
2. A child floating in space among stars  
3. A giant clock melting over a desert
`.trim();

    __mockCreate.mockReturnValueOnce(Promise.resolve({
      choices: [{ message: { content: mockContent } }]
    }));

    const dream = "I was lost in a forest and saw stars and clocks melting.";
    const result = await extractScenes(dream);

    expect(result).toContain("Number of scenes:");
    // Check for 3 scene lines
    expect(result).toMatch(/1\..+2\..+3\./s); 
  });

  test('returns undefined and logs error on failure', async () => {
    const { __mockCreate } = require('openai');

    // Simulate GPT call failure
    __mockCreate.mockRejectedValueOnce(new Error("Simulated failure"));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = await extractScenes("A dream about flying");

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith("Error:", expect.any(Error));

    consoleSpy.mockRestore();
  });
});

describe('findSymbolsFromGPT', () => {
  beforeEach(() => {
    // Reset mocks before each test
    const { __mockCreate } = require('openai');
    __mockCreate.mockReset();
  });

  test('returns parsed array of symbols from valid JSON', async () => {
    const { __mockCreate } = require('openai');

    // Simulate a valid GPT JSON response
    const mockJson = JSON.stringify([
      { symbol: "rabbit", meaning: "The rabbit represents fear and the need to run." },
      { symbol: "mirror", meaning: "The mirror reflects self-perception and truth." }
    ]);

    __mockCreate.mockReturnValueOnce(Promise.resolve({
      choices: [{ message: { content: mockJson } }]
    }));

    const result = await findSymbolsFromGPT(
      "I saw a rabbit and a mirror",
      "Jewish-Israeli",
      "Jungian"
    );

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('symbol', 'rabbit');
  });

  test('returns empty array on invalid JSON', async () => {
    const { __mockCreate } = require('openai');

    // Simulate GPT returning non-JSON content
    __mockCreate.mockReturnValueOnce(Promise.resolve({
      choices: [{ message: { content: 'not valid JSON' } }]
    }));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = await findSymbolsFromGPT("scene", "bg", "style");

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith("Failed to parse GPT response:", expect.any(String));

    consoleSpy.mockRestore();
  });
});
