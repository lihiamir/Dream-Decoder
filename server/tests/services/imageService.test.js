const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { generateAndUploadImage } = require('../../services/image'); 
const { bucket } = require('../../config/firebase');
const { OpenAI } = require('openai');

// Mocks for dependencies
jest.mock('fs');
jest.mock('path');
jest.mock('axios');
jest.mock('openai');
jest.mock('uuid', () => ({ v4: () => 'mock-token' }));
jest.mock('../../config/firebase', () => ({
  bucket: {
    name: 'mock-bucket',
    upload: jest.fn()
  }
}));

describe('generateAndUploadImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('uploads image and returns valid signed URL with correct metadata', async () => {
    const imageUrl = 'https://fake.image.url/image.png';
    const localPath = '/tmp/fake_image_path.png';
    const destinationPath = 'images/final/cat.png';

    // Mock OpenAI image generation response
    OpenAI.mockImplementation(() => ({
      images: {
        generate: jest.fn().mockResolvedValue({
          data: [{ url: imageUrl }]
        })
      }
    }));

    // Mock Axios image download stream
    const mockStream = {
      pipe: jest.fn(),
      on: jest.fn((event, cb) => {
        if (event === 'finish') cb();
      })
    };
    axios.get.mockResolvedValue({ data: mockStream });

    // Mock file write stream
    const mockWriteStream = {
      on: jest.fn((event, cb) => {
        if (event === 'finish') cb();
      })
    };
    fs.createWriteStream.mockReturnValue(mockWriteStream);

    // Ensure file cleanup doesn't throw
    fs.unlinkSync.mockImplementation(() => {});
    
    // Mock temp file path
    path.join.mockReturnValue(localPath);

    // Mock Firebase upload
    bucket.upload.mockResolvedValue([{ metadata: { name: 'image.png' } }]);

    // Execute function
    const result = await generateAndUploadImage('a cat flying in space', destinationPath);

    // Verify OpenAI was called
    expect(OpenAI).toHaveBeenCalledWith({ apiKey: process.env.OPENAI_API_KEY });

    // Verify Axios was used to download the image
    expect(axios.get).toHaveBeenCalledWith(imageUrl, { responseType: "stream" });

    // Verify file creation and cleanup
    expect(fs.createWriteStream).toHaveBeenCalledWith(localPath);
    expect(fs.unlinkSync).toHaveBeenCalledWith(localPath);

    // Verify Firebase upload
    expect(bucket.upload).toHaveBeenCalledWith(localPath, {
      destination: destinationPath,
      metadata: {
        contentType: "image/png",
        metadata: {
          firebaseStorageDownloadTokens: 'mock-token'
        }
      }
    });

    // Verify final signed URL
    expect(result).toBe(
      `https://firebasestorage.googleapis.com/v0/b/mock-bucket/o/${encodeURIComponent(destinationPath)}?alt=media&token=mock-token`
    );
  });

  test('returns null and logs error when OpenAI image generation fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Force OpenAI to throw an error
    OpenAI.mockImplementation(() => ({
      images: {
        generate: jest.fn().mockRejectedValue(new Error('Simulated API failure'))
      }
    }));

    const result = await generateAndUploadImage('fail me', 'images/final/fail.png');

    // Verify fallback behavior
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      "❌ Error generating/uploading image:",
      "Simulated API failure"
    );

    consoleSpy.mockRestore();
  });
});
