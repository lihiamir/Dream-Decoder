const request = require('supertest');
const express = require('express');
const profileRouter = require('../../routes/profile');
const profileService = require('../../services/profile');

// Mock Firebase admin (to avoid real DB calls)
jest.mock('../../services/profile');
jest.mock('../../middlewares/auth', () => ({
  authenticateToken: (req, res, next) => {
    // Simulate authenticated user
    req.uid = 'test-user-id';
    next();
  }
}));

// Set up the Express app with the route
const app = express();
app.use(express.json());
app.use('/profile', profileRouter);

describe('POST /profile/setup', () => {
  it('should save profile successfully', async () => {
    // Simulate success response from profile service
    profileService.saveInterpretationProfile.mockResolvedValueOnce();

    const res = await request(app)
      .post('/profile/setup')
      .send({
        background: 'Jewish',
        interpretationStyle: 'Symbolic'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Profile saved successfully');
    // Verify correct arguments were passed to the service
    expect(profileService.saveInterpretationProfile).toHaveBeenCalledWith('test-user-id', {
      background: 'Jewish',
      interpretationStyle: 'Symbolic'
    });
  });

  it('should return 500 if service fails', async () => {
    // Simulate failure in saving the profile
    profileService.saveInterpretationProfile.mockRejectedValueOnce(new Error('DB error'));

    const res = await request(app)
      .post('/profile/setup')
      .send({});

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Failed to save profile');
  });
});
