'use strict';
const {server} = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);
const base64 = require('base-64');
const { db } = require('../src/auth/models/index');
beforeAll(async () => {
    await db.sync();
  });
  //---------------------------------------------------------------------------------------
  afterAll(async () => {
    await db.drop();
  });

describe('server & basic auth', ()=> {

    test('/proofOfLife', async () => {       // Check if server is alive
        const response = await mockRequest.get('/');
        expect(response.status).toBe(200);
    });
// ----------
    test('404 handler error', async () => {      // Check if 404 is handled 
        const response = await mockRequest.get('/wrong');
        expect(response.status).toBe(404);
    });
// ------------
    test('500 handler function', async () => {     // Check if general error handling is working
        const response = await mockRequest.get('/bad');
        expect(response.status).toBe(500);

    });
// -------
    it('POST to /signup to create a new use', async () => {
        const user = await mockRequest.post('/signup').send({
          username: "dima",
          password: "dima"
        });
        expect(user.status).toBe(201);
    });
    //---------------------------------------------------------------------------------------
    it('POST to /signin to login as a user (use basic auth)', async () => {
        const user = await mockRequest.post('/signin').auth('dima', 'dima');
        expect(user.status).toBe(200);
    });
    //---------------------------------------------------------------------------------------
    
    it('Does the middleware function (send it a basic header)  ', async () => {
        const user = await mockRequest.post('/signin').auth('abcd', '1234');
        expect(user.status).toBe(403);
    });
    //---------------------------------------------------------------------------------------
    it('Do the routes assert the requirements signup/signin', async () => {
        const Obj = await mockRequest.post('/signup').send({
          username: 'dima',
          password: 'dima'
        });
    //---------------------------------------------------------------------------------------
        const user = await mockRequest.post('/signin').send({
          username: 'dima',
          password: 'dima'
        }).auth(Obj.body.username, 'dima');
        expect(user.status).toBe(200);
      })
    //---------------------------------------------------------------------------------------
    })
