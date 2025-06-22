const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const profileController = require('../../controllers/profile');
const profileService = require('../../services/profile');

// Mock the profileService
jest.mock('../../services/profile');

// Setup a minimal Express app to test the controller
const app = express();
app.use(bodyParser.json());

// Middleware to inject req.uid like your auth middleware
app.use((req, res, next) => {
  req.uid = 'mocked_uid';
  next();
});

app.post('/profile', profileController.saveInterpretationProfile);

describe('Profile Controller - saveInterpretationProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return 200 when profile is saved successfully', async () => {
    profileService.saveInterpretationProfile.mockResolvedValueOnce();

    const res = await request(app)
      .post('/profile')
      .send({ background: 'Jewish', interpretationStyle: 'Symbolic' });

    expect(profileService.saveInterpretationProfile).toHaveBeenCalledWith(
      'mocked_uid',
      { background: 'Jewish', interpretationStyle: 'Symbolic' }
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Profile saved successfully' });
  });

  test('should return 500 when service throws an error', async () => {
    profileService.saveInterpretationProfile.mockRejectedValueOnce(
      new Error('DB failure')
    );

    const res = await request(app)
      .post('/profile')
      .send({ background: 'Other' });

    expect(profileService.saveInterpretationProfile).toHaveBeenCalled();
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to save profile' });
  });
});
