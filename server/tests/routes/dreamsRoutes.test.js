// test file
const express = require('express');
const dreamsRoutes = require('../../routes/dreams');

describe('Dreams Routes', () => {
  const app = express();
  app.use(dreamsRoutes);

  test('should define POST /submit route', () => {
    const route = dreamsRoutes.stack.find(
      r => r.route?.path === '/submit' && r.route.methods.post
    );
    expect(route).toBeDefined();
  });

  test('should define POST /clarify route', () => {
    const route = dreamsRoutes.stack.find(
      r => r.route?.path === '/clarify' && r.route.methods.post
    );
    expect(route).toBeDefined();
  });

  test('should define GET /my-dreams route', () => {
    const route = dreamsRoutes.stack.find(
      r => r.route?.path === '/my-dreams' && r.route.methods.get
    );
    expect(route).toBeDefined();
  });
});
