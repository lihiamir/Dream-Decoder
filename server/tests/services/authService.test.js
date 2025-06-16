const authService = require('../../services/auth');

// Mock Firebase admin module
jest.mock('../../config/firebase', () => ({
  admin: {
    auth: () => ({
      verifyIdToken: jest.fn().mockResolvedValue({
        uid: '123',
        email: 'test@example.com',
        name: 'Test User'
      })
    }),
    firestore: () => ({
      collection: () => ({
        doc: () => ({
          set: jest.fn().mockResolvedValue(true),
          get: jest.fn().mockResolvedValue({
            exists: true,
            data: () => ({ displayName: 'Test User' })
          })
        })
      })
    })
  }
}));

describe('Auth Service', () => {
  test('verifyToken should decode a valid token', async () => {
    const decoded = await authService.verifyToken('valid_token');
    expect(decoded.uid).toBe('123');
    expect(decoded.email).toBe('test@example.com');
  });

  test('getUserDisplayName should return displayName if user exists', async () => {
    const name = await authService.getUserDisplayName('123');
    expect(name).toBe('Test User');
  });

  test('registerUser should decode token and save user to Firestore', async () => {
    const user = await authService.registerUser('valid_token');
    expect(user.uid).toBe('123');
    expect(user.email).toBe('test@example.com');
    expect(user.displayName).toBe('Test User');
  });

  test('loginUser should decode token and return user info', async () => {
    const user = await authService.loginUser('valid_token');
    expect(user).toEqual({
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User'
    });
  });
});
