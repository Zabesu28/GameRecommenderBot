import { expect } from 'chai';
import request from 'supertest';
import nock from 'nock';
import app from './index.mjs'; // Assurez-vous que votre fichier app est également un module ES

describe('GET /api/platforms', () => {
  it('should return a list of platforms', async () => {
    // Mock the RAWG API response
    nock('https://api.rawg.io')
      .get('/api/platforms')
      .query({ key: '7c91604c2e8046eba54b666f6a76edc3' })
      .reply(200, {
        results: [
          { id: 1, name: 'Platform 1' },
          { id: 2, name: 'Platform 2' },
        ],
      });

    // Make the request to your API
    const res = await request(app)
      .get('/api/platforms')
      .expect('Content-Type', /json/)
      .expect(200);

    // Assert the response
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(2);
    expect(res.body[0]).to.have.property('id', 1);
    expect(res.body[0]).to.have.property('name', 'Platform 1');
    expect(res.body[1]).to.have.property('id', 2);
    expect(res.body[1]).to.have.property('name', 'Platform 2');
  });

  it('should return a 500 error if RAWG API call fails', async () => {
    // Mock the RAWG API response to return an error
    nock('https://api.rawg.io')
      .get('/api/platforms')
      .query({ key: '7c91604c2e8046eba54b666f6a76edc3' })
      .reply(500);

    // Make the request to your API
    const res = await request(app)
      .get('/api/platforms')
      .expect('Content-Type', /json/)
      .expect(500);

    // Assert the response
    expect(res.body).to.have.property('error', 'Internal Server Error');
  });
});

describe('POST /api/chat', () => {
  it('should return a response from OpenAI', async () => {
    const genre = 'Action';
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Bot response content'
          }
        }
      ]
    };

    // Mock the OpenAI API response
    nock('https://api.openai.com')
      .post('/v1/chat/completions')
      .reply(200, mockResponse);

    // Make the request to your API
    const res = await request(app)
      .post('/api/chat')
      .send({ message: genre })
      .expect('Content-Type', /json/)
      .expect(200);

    // Assert the response
    expect(res.body).to.have.property('message', 'Bot response content');
  });

  it('should handle errors from OpenAI API', async () => {
    const genre = 'Strategy';

    // Mock the OpenAI API response to return an error
    nock('https://api.openai.com')
      .post('/v1/chat/completions')
      .replyWithError('Internal Server Error');

    // Make the request to your API
    const res = await request(app)
      .post('/api/chat')
      .send({ message: genre })
      .expect('Content-Type', /json/)
      .expect(500);

    // Assert the response
    expect(res.body).to.have.property('error', 'Internal Server Error');
  });
});
  