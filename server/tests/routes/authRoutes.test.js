const express = require('express');
const authRoutes = require('../../routes/auth');

describe('Auth Routes', () => {
  const app = express();
  app.use(authRoutes);

  test('should define POST /login route', () => {
    const route = authRoutes.stack.find(r => r.route?.path === '/login' && r.route.methods.post);
    expect(route).toBeDefined();
  });

  test('should define POST /register route', () => {
    const route = authRoutes.stack.find(r => r.route?.path === '/register' && r.route.methods.post);
    expect(route).toBeDefined();
  });

  test('should define GET /user route', () => {
    const route = authRoutes.stack.find(r => r.route?.path === '/user' && r.route.methods.get);
    expect(route).toBeDefined();
  });
});
