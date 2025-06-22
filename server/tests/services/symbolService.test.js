const { extractSymbolInterpretations } = require('../../services/symbol');
const chatService = require('../../services/chat');

// Mock the dependent function
jest.mock('../../services/chat', () => ({
  findSymbolsFromGPT: jest.fn()
}));

describe('extractSymbolInterpretations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns structured interpretations for multiple scenes', async () => {
    const scenes = [
      'I saw a black cat in the window.',
      'A door opened to a glowing forest.'
    ];
    const background = 'Jewish-Israeli';
    const style = 'Symbolic';

    // Mock GPT response per scene
    chatService.findSymbolsFromGPT
      .mockResolvedValueOnce([
        { symbol: 'cat', meaning: 'A cat may symbolize independence or bad luck.' }
      ])
      .mockResolvedValueOnce([
        { symbol: 'door', meaning: 'A door often represents new opportunities.' },
        { symbol: 'forest', meaning: 'A forest may symbolize the unknown or mystery.' }
      ]);

    const result = await extractSymbolInterpretations(scenes, background, style);

    expect(chatService.findSymbolsFromGPT).toHaveBeenCalledTimes(2);
    expect(chatService.findSymbolsFromGPT).toHaveBeenCalledWith(
      scenes[0], background, style
    );
    expect(chatService.findSymbolsFromGPT).toHaveBeenCalledWith(
      scenes[1], background, style
    );

    expect(result).toEqual([
      {
        scene: scenes[0],
        symbols: [
          { symbol: 'cat', meaning: 'A cat may symbolize independence or bad luck.' }
        ]
      },
      {
        scene: scenes[1],
        symbols: [
          { symbol: 'door', meaning: 'A door often represents new opportunities.' },
          { symbol: 'forest', meaning: 'A forest may symbolize the unknown or mystery.' }
        ]
      }
    ]);
  });

  test('handles scenes with no symbols returned gracefully', async () => {
    const scenes = ['Nothing happened'];
    chatService.findSymbolsFromGPT.mockResolvedValueOnce([]);

    const result = await extractSymbolInterpretations(scenes, 'Other', 'Jungian');

    expect(result).toEqual([
      {
        scene: 'Nothing happened',
        symbols: []
      }
    ]);
  });

  test('throws if findSymbolsFromGPT fails', async () => {
    chatService.findSymbolsFromGPT.mockRejectedValueOnce(
      new Error('GPT call failed')
    );

    await expect(
      extractSymbolInterpretations(['Scene text'], 'Any', 'Any')
    ).rejects.toThrow('GPT call failed');
  });
});
