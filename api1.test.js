const request = require("supertest");
const app = require("./api1.js");

test("should return correct value for civic 2000 model", async () => {
  const res = await request(app)
    .post("/vehicle-value")
    .send({ model: "civic", year: 2000 })
    .expect("Content-Type", /json/)
    .expect(200);

  expect(res.body).toEqual({
    model: "civic",
    year: "2000",
    value: 6620,
  });
});

test("should return correct value for models with only numbers", async () => {
  const res = await request(app)
    .post("/vehicle-value")
    .send({ model: "123", year: 2000 })
    .expect("Content-Type", /json/)
    .expect(200);

  expect(res.body).toEqual({
    model: "123",
    year: "2000",
    value: 2123,
  });
});

test("should return enter some valid input", async () => {
  const res = await request(app)
    .post("/vehicle-value")
    .send({ model: "", year: 2020 })
    .expect("Content-Type", /json/)
    .expect(400);

  expect(res.body).toEqual({
    error: "Enter some valid input",
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

test("should return year is in future", async () => {
  const res = await request(app)
    .post("/vehicle-value")
    .send({ model: "civic", year: 2035 })
    .expect("Content-Type", /json/)
    .expect(400);

  expect(res.body).toEqual({
    error: "Year must be in the present or past",
  });
});
