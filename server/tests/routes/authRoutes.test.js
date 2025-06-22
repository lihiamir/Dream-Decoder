const express = require('express');
const authRoutes = require('../../routes/auth');

describe('Auth Routes', () => {
  const app = express();
  app.use(authRoutes);

  test('should define POST /login route', () => {
    // Check that /login route exists and supports POST
    const route = authRoutes.stack.find(r => r.route?.path === '/login' && r.route.methods.post);
    expect(route).toBeDefined();
  });

  test('should define POST /register route', () => {
    // Check that /register route exists and supports POST
    const route = authRoutes.stack.find(r => r.route?.path === '/register' && r.route.methods.post);
    expect(route).toBeDefined();
  });

  test('should define GET /user route', () => {
    // Check that /user route exists and supports GET
    const route = authRoutes.stack.find(r => r.route?.path === '/user' && r.route.methods.get);
    expect(route).toBeDefined();
  });
});
