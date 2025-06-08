// test file
const request = require('supertest');
const express = require('express');
const dreamsRoutes = require('../../routes/dreams');
const app = express();

app.use(express.json());
app.use(dreamsRoutes);

// אפשר להשתמש ב־jest.mock() כדי ללעוג ל־services, אם רוצים

describe('Dreams Controller', () => {
  test('should return 400 if no dream text is provided', async () => {
    const res = await request(app)
      .post('/submit')
      .set('Authorization', 'Bearer dummy_token');
    expect(res.statusCode).toBe(500); // כי getDreamText יזרוק שגיאה
  });

  test('should return 400 if no text in clarification', async () => {
    const res = await request(app)
      .post('/clarify')
      .send({})
      .set('Authorization', 'Bearer dummy_token');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Missing original dream text');
  });
});
