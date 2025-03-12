const request = require("supertest");
const app = require("./app");

//API 3

test('return premium if correctly inputted value & risk rating', async () => {
    const response = await request(app).post('/api3')
    .send({ "car_value" : 3550, "risk_rating": 4})
        expect(response.body).toHaveProperty('monthly_premium')
        expect(response.body).toHaveProperty('yearly_premium')
        expect(response.body.monthly_premium).toEqual(11.8)
        expect(response.body.yearly_premium).toEqual(142)
  });

test('return error if car value 0 or below', async () => {
    const response = await request(app).post('/api3')
    .send({ "car_value" : 0, "risk_rating": 5});
        expect(response.body.error).toEqual('There is an error')
});

test('return error if risk rating 0 or below', async () => {
    const response = await request(app).post('/api3')
    .send({ car_value : 3340, risk_rating: 0})
        expect(response.body.error).toEqual('There is an error')
});

test('return error if incorrect data type entered', async () => {
    const response = await request(app).post('/api3')
    .send({ "car_value" : 'one hundred', "risk_rating": 5})
        expect(response.body.error).toEqual('There is an error')
});

test('return error if risk rating above 5', async () => {
    const response = await request(app).post('/api3')
    .send({ "car_value" : 1000, "risk_rating": 6})
        expect(response.body.error).toEqual('There is an error')
});


