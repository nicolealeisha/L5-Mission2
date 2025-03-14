const request = require("supertest");
const app = require("./api1.js");

test("should return correct value for civic 2000 model", async () => {
  const res = await request(app)
    .post("/vehicle-value")
    .send({ model: "civic", year: 2014 })
    .expect("Content-Type", /json/)
    .expect(200);

  expect(res.body).toEqual({
    car_value: 6614,
  });
});

test("should return an error if year is not in number", async () => {
  const res = await request(app)
    .post("/vehicle-value")
    .send({ model: "Honda", year: "twentyTwo" })
    .expect("Content-Type", /json/)
    .expect(400);

  expect(res.body).toEqual({
    error: "Enter enter year in number",
  });
});

test("should return an error if year is negative", async () => {
  const res = await request(app)
    .post("/vehicle-value")
    .send({ model: "civic", year: -2000 })
    .expect("Content-Type", /json/)
    .expect(400);

  expect(res.body).toEqual({
    error: "Year must be a positive number",
  });
});

test("should return an error year must be in the present or past", async () => {
  const res = await request(app)
    .post("/vehicle-value")
    .send({ model: "civic", year: 2035 })
    .expect("Content-Type", /json/)
    .expect(400);

  expect(res.body).toEqual({
    error: "Year must be in the present or past",
  });
});

test("should return enter model name should not be null", async () => {
  const res = await request(app)
    .post("/vehicle-value")
    .send({ model: "", year: 2014 })
    .expect("Content-Type", /json/)
    .expect(400);
  expect(res.body).toEqual({
    error: "Enter some valid input",
  });
});
