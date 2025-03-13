const request = require('supertest');
const app = require('./app');

test('Should return a risk rating of 1 for valid inputs', async () => {
    const response = await request(app)
        .post('/count-words')
        .send({ text: 'I am an old lady of 80 years of age. I was reversing out of my driveway and bumped the letter box. It left a small mark but nothing much.' });
    expect(response.body).toEqual({ risk_rating: 1 });
});
