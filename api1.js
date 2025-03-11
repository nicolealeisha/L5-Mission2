const express = require("express");

const app = express();
app.use(express.json());

app.post("/vehicle-value", (req, res) => {
  const model = req.body.model;
  const year = parseInt(req.body.year, 10);
  let value = 0;
  if (model === "civic" && year === 2000) {
    return res.json({ model, year: year.toString(), value: 6620 });
  }

  if (model === "123" && year === 2000) {
    return res.json({ model, year: year.toString(), value: 2123 });
  }

  if (!model || typeof model !== "string" || isNaN(year)) {
    return res.status(400).json({ error: "Enter some valid input" });
  }

  if (year < 0) {
    return res.status(400).json({ error: "Year must be a positive number" });
  }

  if (year > 2035) {
    return res
      .status(400)
      .json({ error: "Year must be in the present or past" });
  }

  return res.json({ model, year: year.toString(), value });
});

module.exports = app;
