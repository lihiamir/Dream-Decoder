const fs = require('fs');
const { OpenAI } = require('openai');
const { transcribeAudio } = require('../../services/speech'); 

jest.mock('fs');
jest.mock('openai');

describe('transcribeAudio', () => {
  let mockCreate;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock OpenAI initialization
    mockCreate = jest.fn();
    OpenAI.mockImplementation(() => ({
      audio: {
        transcriptions: {
          create: mockCreate
        }
      }
    }));
  });

  test('successfully transcribes audio and returns text', async () => {
    const dummyPath = '/mock/audio.mp3';

    // Mock fs behavior
    fs.statSync.mockReturnValue({ size: 12345 });
    fs.existsSync.mockReturnValue(true);
    fs.createReadStream.mockReturnValue('mockStream');

    // Mock OpenAI transcription response
    mockCreate.mockResolvedValue({ text: 'This is a test transcription.' });

    const result = await transcribeAudio(dummyPath);

    expect(fs.statSync).toHaveBeenCalledWith(dummyPath);
    expect(fs.existsSync).toHaveBeenCalledWith(dummyPath);
    expect(fs.createReadStream).toHaveBeenCalledWith(dummyPath);
    expect(mockCreate).toHaveBeenCalledWith({
      file: 'mockStream',
      model: 'whisper-1',
      language: 'he'
    });
    expect(result).toBe('This is a test transcription.');
  });

  test('returns undefined if file does not exist', async () => {
    const dummyPath = '/missing/audio.mp3';

    fs.existsSync.mockReturnValue(false);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const result = await transcribeAudio(dummyPath);

    expect(fs.existsSync).toHaveBeenCalledWith(dummyPath);
    expect(consoleSpy).toHaveBeenCalled();
    expect(result).toBeUndefined();

    consoleSpy.mockRestore();
  });

  test('handles OpenAI error and logs it', async () => {
    const dummyPath = '/error/audio.mp3';

    fs.existsSync.mockReturnValue(true);
    fs.statSync.mockReturnValue({ size: 5555 });
    fs.createReadStream.mockReturnValue('stream');

    mockCreate.mockRejectedValue(new Error('OpenAI failed'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const result = await transcribeAudio(dummyPath);

    expect(consoleSpy).toHaveBeenCalledWith('שגיאה בתמלול:', 'OpenAI failed');
    expect(result).toBeUndefined();

    consoleSpy.mockRestore();
  });
});
