import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

const BASE_API = 'https://jsonplaceholder.typicode.com';

// JSON Schemas for response validation
const postSchema = {
  type: 'object',
  required: ['id', 'userId', 'title', 'body'],
  properties: {
    id: { type: 'number' },
    userId: { type: 'number' },
    title: { type: 'string', minLength: 1 },
    body: { type: 'string', minLength: 1 },
  },
  additionalProperties: false,
};

const userSchema = {
  type: 'object',
  required: ['id', 'name', 'username', 'email'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string', format: 'email' },
  },
};

test.describe('@smoke REST API Tests', () => {

  test.describe('GET /posts', () => {
    test('returns 200 with valid schema for a single post', async ({ request }) => {
      const start = Date.now();
      const response = await request.get(`${BASE_API}/posts/1`);
      const elapsed = Date.now() - start;

      expect(response.status()).toBe(200);
      expect(elapsed).toBeLessThan(2000); // response time assertion

      const body = await response.json();
      expect(body.id).toBe(1);

      const validate = ajv.compile(postSchema);
      const valid = validate(body);
      expect(valid, `Schema errors: ${JSON.stringify(validate.errors)}`).toBeTruthy();
    });

    test('returns 404 for a non-existent post', async ({ request }) => {
      const response = await request.get(`${BASE_API}/posts/99999`);
      expect(response.status()).toBe(404);
    });
  });

  test.describe('@regression GET /users', () => {
    test('returns non-empty array with valid email format', async ({ request }) => {
      const response = await request.get(`${BASE_API}/users`);
      expect(response.status()).toBe(200);

      const users = await response.json();
      expect(Array.isArray(users)).toBeTruthy();
      expect(users.length).toBeGreaterThan(0);

      const validate = ajv.compile(userSchema);
      users.forEach((user, idx) => {
        const valid = validate(user);
        expect(valid, `User[${idx}] schema errors: ${JSON.stringify(validate.errors)}`).toBeTruthy();
      });
    });
  });

  test.describe('@regression POST /posts', () => {
    test('creates a new post and returns 201 with echoed body', async ({ request }) => {
      const payload = { title: 'Test Post', body: 'Automated test content', userId: 1 };

      const response = await request.post(`${BASE_API}/posts`, { data: payload });
      expect(response.status()).toBe(201);

      const created = await response.json();
      expect(created.title).toBe(payload.title);
      expect(created.body).toBe(payload.body);
      expect(created.id).toBeDefined();
    });

    test('missing required fields still returns server response', async ({ request }) => {
      const response = await request.post(`${BASE_API}/posts`, { data: {} });
      // JSONPlaceholder is lenient — in a real API you would assert 400
      expect([200, 201, 400]).toContain(response.status());
    });
  });

});
