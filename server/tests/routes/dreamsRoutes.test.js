const express = require('express');
const dreamsRoutes = require('../../routes/dreams');

describe('Dreams Routes', () => {
  const app = express();
  app.use(dreamsRoutes);

  test('should define POST /submit route', () => {
   // Check that /submit route exists and supports POST
    const route = dreamsRoutes.stack.find(
      r => r.route?.path === '/submit' && r.route.methods.post
    );
    expect(route).toBeDefined();
  });

  test('should define POST /clarify route', () => {
    // Check that /clarify route exists and supports POST
    const route = dreamsRoutes.stack.find(
      r => r.route?.path === '/clarify' && r.route.methods.post
    );
    expect(route).toBeDefined();
  });

  test('should define GET /my-dreams route', () => {
    // Check that /my-dreams route exists and supports GET
    const route = dreamsRoutes.stack.find(
      r => r.route?.path === '/my-dreams' && r.route.methods.get
    );
    expect(route).toBeDefined();
  });
});
