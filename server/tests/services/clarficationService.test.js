const { analyzeDreamForClarifications, parseClarifications } = require('../../services/clarification');

// Jest mock of OpenAI
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

describe('analyzeDreamForClarifications', () => {
  beforeEach(() => {
    const { __mockCreate } = require('openai');
    __mockCreate.mockReset();
  });

  test('returns follow-up questions when needed', async () => {
    const { __mockCreate } = require('openai');
    
    const mockResponse = JSON.stringify({
      needsFollowUp: true,
      questions: ["Who is Dana?", "Where did the dream take place?"]
    });

    __mockCreate.mockReturnValueOnce(Promise.resolve({
      choices: [{ message: { content: mockResponse } }]
    }));

    const result = await analyzeDreamForClarifications("I was walking with Dana in a strange place.");

    expect(result).toHaveProperty("needsFollowUp", true);
    expect(result.questions.length).toBeGreaterThan(0);
  });

  test('returns needsFollowUp: false on clear dreams', async () => {
    const { __mockCreate } = require('openai');

    __mockCreate.mockReturnValueOnce(Promise.resolve({
      choices: [{ message: { content: JSON.stringify({ needsFollowUp: false }) } }]
    }));

    const result = await analyzeDreamForClarifications("I dreamed about flying over mountains.");

    expect(result).toEqual({ needsFollowUp: false });
  });

  test('returns needsFollowUp: false on invalid JSON', async () => {
    const { __mockCreate } = require('openai');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    __mockCreate.mockReturnValueOnce(Promise.resolve({
      choices: [{ message: { content: 'not valid JSON' } }]
    }));

    const result = await analyzeDreamForClarifications("Something weird happened.");

    expect(result).toEqual({ needsFollowUp: false });
    expect(consoleSpy).toHaveBeenCalledWith("❌ Clarification analysis error:", expect.any(String));

    consoleSpy.mockRestore();
  });
});

describe('parseClarifications', () => {
  beforeEach(() => {
    const { __mockCreate } = require('openai');
    __mockCreate.mockReset();
  });

  test('returns parsed clarifications as object', async () => {
    const { __mockCreate } = require('openai');

    const mockResponse = JSON.stringify({
      "דנה": "חברה שלי מהעבודה",
      "יוסי": "המורה למתמטיקה"
    });

    __mockCreate.mockReturnValueOnce(Promise.resolve({
      choices: [{ message: { content: mockResponse } }]
    }));

    const result = await parseClarifications("דנה היא חברה שלי מהעבודה ויוסי היה המורה שלי.");

    expect(result).toHaveProperty("דנה");
    expect(result["דנה"]).toMatch(/מהעבודה/);
    expect(Object.keys(result).length).toBe(2);
  });

  test('returns empty object on invalid JSON', async () => {
    const { __mockCreate } = require('openai');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    __mockCreate.mockReturnValueOnce(Promise.resolve({
      choices: [{ message: { content: "not valid JSON" } }]
    }));

    const result = await parseClarifications("This is not really structured.");

    expect(result).toEqual({});
    expect(consoleSpy).toHaveBeenCalledWith("❌ Error parsing clarifications:", expect.any(String));

    consoleSpy.mockRestore();
  });
});
