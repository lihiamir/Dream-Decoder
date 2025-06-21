const request = require('supertest');
const app = require('../../app');
const authService = require('../../services/auth');

// Mock the auth service methods for controlled behavior
jest.mock('../../services/auth', () => ({
  registerUser: jest.fn((token) => {
    if (token === 'valid_token') {
      return Promise.resolve({ uid: 'user1', email: 'user@example.com', displayName: 'User' });
    } else {
      throw new Error('Invalid token');
    }
  }),
  loginUser: jest.fn((token) => {
    if (token === 'valid_token') {
      return Promise.resolve({ uid: 'user1', email: 'user@example.com', displayName: 'User' });
    } else {
      throw new Error('Invalid or expired token');
    }
  }),
  getUserDisplayName: jest.fn((uid) => {
    if (uid === 'user1') return Promise.resolve('Test User');
    return Promise.resolve(null);
  })
}));

// Mock the auth middleware to simulate authenticated requests
jest.mock('../../middlewares/auth', () => ({
  authenticateToken: (req, res, next) => {
    // Simulate decoded UID from token
    req.uid = req.headers.uid || 'user1'; 
    next();
  }
}));

describe('Auth Controller', () => {
  const basePath = '/api/auth';

  test('register: should return 401 if token is missing', async () => {
    const res = await request(app).post(`${basePath}/register`);
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Token missing');
  });

  test('register: should return 201 with user info on valid token', async () => {
    const res = await request(app)
      .post(`${basePath}/register`)
      .set('Authorization', 'Bearer valid_token');
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('uid', 'user1');
    expect(res.body.message).toBe('User registered seccessfuly');
  });

  test('register: should return 401 on invalid token', async () => {
    const res = await request(app)
      .post(`${basePath}/register`)
      .set('Authorization', 'Bearer invalid_token');
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid token');

  });

  test('login: should return 401 if token is missing', async () => {
    const res = await request(app).post(`${basePath}/login`);
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Token missing');
  });

  test('login: should return 200 on valid token', async () => {
    const res = await request(app)
      .post(`${basePath}/login`)
      .set('Authorization', 'Bearer valid_token');
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('uid', 'user1');
    expect(res.body.message).toBe('Login successful');
  });

  test('login: should return 401 on invalid token', async () => {
    const res = await request(app)
      .post(`${basePath}/login`)
      .set('Authorization', 'Bearer invalid_token');
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid or expired token');
  });

  test('getUserDisplayName: should return 200 with displayName', async () => {
    const res = await request(app)
      .get(`${basePath}/user`)
      .set('Authorization', 'Bearer valid_token')
      .set('uid', 'user1'); 
    expect(res.statusCode).toBe(200);
    expect(res.body.displayName).toBe('Test User');
  });

  test('getUserDisplayName: should return 404 if user not found', async () => {
    const res = await request(app)
      .get(`${basePath}/user`)
      .set('Authorization', 'Bearer valid_token')
      .set('uid', 'unknown_user');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found or displayName missing');
  });

  test('getUserDisplayName: should return 500 on service error', async () => {
    authService.getUserDisplayName.mockImplementationOnce(() => {
      throw new Error('Simulated failure');
    });

    const res = await request(app)
      .get(`${basePath}/user`)
      .set('Authorization', 'Bearer valid_token')
      .set('uid', 'user1');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal server error');
  });
});
