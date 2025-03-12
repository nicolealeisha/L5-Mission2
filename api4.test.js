
const request = require('supertest');
const app4 = require('./api4');

describe('POST /api/discount', () => {
    it('should calculate 0% discount for young inexperienced driver', async () => {
        const res = await request(app4)
            .post('/api/discount')
            .send({ age: 20, experience: 2 })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toEqual({ discount_rate: 0 });
    });

    it('should calculate 10% discount for age 30 with 6 years experience', async () => {
        const res = await request(app4)
            .post('/api/discount')
            .send({ age: 30, experience: 6 })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toEqual({ discount_rate: 10 });
    });

    it('should calculate maximum 20% discount for experienced older driver', async () => {
        const res = await request(app4)
            .post('/api/discount')
            .send({ age: 45, experience: 15 })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toEqual({ discount_rate: 20 });
    });

    it('should return error for missing inputs', async () => {
        const res = await request(app4)
            .post('/api/discount')
            .send({ age: 30 })
            .expect('Content-Type', /json/)
            .expect(400);

        expect(res.body).toHaveProperty('error');
    });

    it('should return error for negative values', async () => {
        const res = await request(app4)
            .post('/api/discount')
            .send({ age: 30, experience: -5 })
            .expect('Content-Type', /json/)
            .expect(400);

        expect(res.body).toHaveProperty('error');
    });

    it('should return error when experience exceeds age-16', async () => {
        const res = await request(app4)
            .post('/api/discount')
            .send({ age: 25, experience: 15 })
            .expect('Content-Type', /json/)
            .expect(400);

        expect(res.body).toHaveProperty('error');
    });
});
