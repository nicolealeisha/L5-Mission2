const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//----API 1-----

//----API 2-----

//----API 3-----
app.post('/api3', (req, res) => {
  const carValue = parseFloat(req.body.car_value);
  const riskRating = parseFloat(req.body.risk_rating);

  //error handling
  if (isNaN(carValue) || isNaN(riskRating)) {
    return res
      .status(400)
      .json({ error: 'Please enter a numerical value for car value and risk rating' });
  }

  if (carValue <= 0) {
    return res
      .status(400)
      .json({ error: 'Please enter a valid car value above 0' });
  }

  if (riskRating <= 0 || riskRating > 5) {
    return res
      .status(400)
      .json({ error: 'Please enter a risk rating between 1 and 5' });
  }

  //calculate yearly and monthly premium based on values entered
  const yearlyPremium = carValue * riskRating / 100;
  const monthlyPremium = yearlyPremium / 12;

  //success handling
  console.log(req.body);
  res
    .status(200)
    .json({
      monthly_premium: parseFloat(monthlyPremium.toFixed(1)),
      yearly_premium: parseFloat(yearlyPremium.toFixed(0)),
    });
});

//----API 4-----
app.post('/api/discount', (req, res) => {
  try {
    const { age, experience } = req.body;

    // Validate inputs are present
    if (age === undefined || experience === undefined) {
      return res.status(400).json({ error: "age and experience are required" });
    }

    // Validate inputs are numbers
    if (typeof age !== 'number' || typeof experience !== 'number') {
      return res.status(400).json({ error: "age and experience must be numbers" });
    }

    // Validate inputs are non-negative
    if (age < 0 || experience < 0) {
      return res.status(400).json({ error: "age and experience cannot be negative" });
    }

    // Validate age is reasonable
    if (age > 120) {
      return res.status(400).json({ error: "invalid age" });
    }

    // Validate experience makes sense with age
    if (experience > age - 16) {
      return res.status(400).json({ error: "driving experience cannot be greater than age minus 16" });
    }

    // Calculate discount rate
    let discount_rate = 0;

    // Age-based discounts
    if (age >= 40) {
      discount_rate += 10; // 5% for 25+ and additional 5% for 40+
    } else if (age >= 25) {
      discount_rate += 5;
    }

    // Experience-based discounts
    if (experience >= 10) {
      discount_rate += 10; // 5% for 5+ years and additional 5% for 10+ years
    } else if (experience >= 5) {
      discount_rate += 5;
    }

    // Maximum discount cap
    discount_rate = Math.min(discount_rate, 20);

    res.json({ discount_rate });

  } catch (error) {
    res.status(500).json({ error: "there is an error" });
  }
});

module.exports = app;