// test file
const profileController = require('../../controllers/profile');
const profileService = require('../../services/profile');
const httpMocks = require('node-mocks-http');

jest.mock('../../services/profile'); // נלעג את השירות שלא באמת יפעיל את המסד

describe('saveInterpretationProfile', () => {
  test('should respond with 200 when profile is saved successfully', async () => {
    // הכנה של בקשה עם uid ו-body
    const req = httpMocks.createRequest({
      method: 'POST',
      uid: 'user123',
      body: { background: 'Tech', interpretationStyle: 'Symbolic' }
    });
    const res = httpMocks.createResponse();

    await profileController.saveInterpretationProfile(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Profile saved successfully' });
  });

  test('should respond with 500 when service throws error', async () => {
    profileService.saveInterpretationProfile.mockImplementation(() => {
      throw new Error('DB error');
    });

    const req = httpMocks.createRequest({
      method: 'POST',
      uid: 'user123',
      body: {}
    });
    const res = httpMocks.createResponse();

    await profileController.saveInterpretationProfile(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ error: 'Failed to save profile' });
  });
});
