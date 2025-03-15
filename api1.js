const express = require("express");

const app = express();
app.use(express.json());

app.post("/vehicle-value", (req, res) => {
  const model = req.body.model;
  const year = parseInt(req.body.year, 10);
  if (!model || typeof model !== "string" || model.trim() === "") {
    return res.status(400).json({ error: "Enter some valid input" });
  }
  if (isNaN(year)) {
    return res.status(400).json({ error: "Enter  year in number" });
  }
  if (year <= 0) {
    return res.status(400).json({ error: "Year must be a positive number" });
  }

  if (year >= 2025) {
    return res
      .status(400)
      .json({ error: "Year must be in the present or past" });
  }

  // Simple function to calculate model value
  function calculateModelValue(model) {
    let sum = 0;
    let upperCaseModel = model.toUpperCase();

    for (let i = 0; i < upperCaseModel.length; i++) {
      let charCode = upperCaseModel.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        // Only consider A-Z
        sum += charCode - 64;
      }
    }
    return sum;
  }

  // Calculate car value
  const modelValue = calculateModelValue(model);
  const carValue = modelValue * 100 + year;

  return res.json({ car_value: carValue });
});

module.exports = app;
