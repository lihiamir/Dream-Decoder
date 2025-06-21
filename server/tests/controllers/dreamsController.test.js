const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const dreamsController = require('../../controllers/dreams');
const dreamsService = require('../../services/dreams');
const speechService = require('../../services/speech');
const clarificationService = require('../../services/clarification');
const recommendationsService = require('../../services/recommendation');

// Mock services used by the controller
jest.mock('../../services/dreams');
jest.mock('../../services/speech');
jest.mock('../../services/clarification');
jest.mock('../../services/recommendation');

// Setup a minimal Express app for testing the controller
const app = express();
const upload = multer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to inject uid/user
app.use((req, res, next) => {
  req.uid = 'mockUid';
  req.user = { uid: 'mockUid' };
  next();
});

app.post('/dreams', upload.single('file'), dreamsController.submitDream);
app.post('/dreams/clarify', upload.any(), dreamsController.clarifyDream);
app.get('/dreams', dreamsController.getAllDreams);
app.get('/dreams/:dreamId', dreamsController.getDreamById);
app.get('/dreams/:dreamId/recommend', dreamsController.getRecommendedDreams);

// ------------------ TESTS ------------------

describe('Dreams Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('submitDream', () => {
    test('should return follow-up questions if clarifications needed', async () => {
      clarificationService.analyzeDreamForClarifications.mockResolvedValue({
        needsFollowUp: true,
        questions: ['Who is Dana?']
      });

      const res = await request(app)
        .post('/dreams')
        .send({ text: 'I dreamed of Dana at the beach.' });

      expect(res.statusCode).toBe(200);
      expect(res.body.followUp).toBe(true);
      expect(res.body.questions).toContain('Who is Dana?');
    });

    test('should process dream if no clarification needed', async () => {
      clarificationService.analyzeDreamForClarifications.mockResolvedValue({ needsFollowUp: false });
      dreamsService.processTextDream.mockResolvedValue({ id: 'dream123', scenes: [] });

      const res = await request(app)
        .post('/dreams')
        .send({ text: 'I was in a forest.' });

      expect(res.statusCode).toBe(200);
      expect(res.body.followUp).toBe(false);
      expect(res.body.id).toBe('dream123');
    });

    test('should return 500 on error', async () => {
      clarificationService.analyzeDreamForClarifications.mockRejectedValue(new Error('Clarification fail'));

      const res = await request(app)
        .post('/dreams')
        .send({ text: 'Something goes wrong' });

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe('Clarification fail');
    });
  });

  describe('clarifyDream', () => {
    test('should enrich dream and return result', async () => {
      clarificationService.parseClarifications.mockResolvedValue({ Dana: 'My boss' });
      speechService.transcribeAudio.mockResolvedValue('Dana is my boss');
      dreamsService.processTextDream.mockResolvedValue({ id: 'dream789', scenes: [] });

      const res = await request(app)
        .post('/dreams/clarify')
        .field('text', 'I saw Dana')
        .field('answer_0_type', 'text')
        .field('answer_0_text', 'Dana is my boss');

      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe('dream789');
    });

    test('should return 400 if original text is missing', async () => {
      const res = await request(app)
        .post('/dreams/clarify')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Missing original dream text');
    });

    test('should return 500 if clarification processing fails', async () => {
      clarificationService.parseClarifications.mockRejectedValue(new Error('Clarify failed'));

      const res = await request(app)
        .post('/dreams/clarify')
        .field('text', 'I dreamed of Dana')
        .field('answer_0_type', 'text')
        .field('answer_0_text', 'Dana is my boss');

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe('Clarify failed');
    });
  });

  describe('getAllDreams', () => {
    test('should return dreams for user', async () => {
      dreamsService.getAllDreams.mockResolvedValue([{ id: 'dream1' }]);
      const res = await request(app).get('/dreams');
      expect(res.statusCode).toBe(200);
      expect(res.body[0].id).toBe('dream1');
    });

    test('should return 500 on fetch error', async () => {
      dreamsService.getAllDreams.mockRejectedValue(new Error('DB fail'));
      const res = await request(app).get('/dreams');
      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe('DB fail');
    });
  });

  describe('getDreamById', () => {
    test('should return dream data if found', async () => {
      dreamsService.getDreamById.mockResolvedValue({
        id: 'dream456',
        scenes: [{ scene: 'Forest' }]
      });

      const res = await request(app).get('/dreams/dream456');
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe('dream456');
    });

    test('should return 404 if dream not found', async () => {
      dreamsService.getDreamById.mockResolvedValue(null);
      const res = await request(app).get('/dreams/dream999');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('getRecommendedDreams', () => {
    test('should return recommendations', async () => {
      recommendationsService.getRecommendedDreamsForUser.mockResolvedValue([{ id: 'rec1' }]);

      const res = await request(app).get('/dreams/dream123/recommend');
      expect(res.statusCode).toBe(200);
      expect(res.body.recommendations[0].id).toBe('rec1');
    });

    test('should return 500 on failure', async () => {
      recommendationsService.getRecommendedDreamsForUser.mockRejectedValue(new Error('Fail'));

      const res = await request(app).get('/dreams/dream123/recommend');
      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe('Server error');
    });
  });
});
