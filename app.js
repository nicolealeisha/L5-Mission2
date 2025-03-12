
// 1. Require dependencies
const express = require("express");
const cors = require('cors');

// 2. Create the new express app instance for our API
const app = express();
app.use(express.json());
app.use(cors());

// 3. Define routes

//----API 1-----



//----API 2-----



//----API 3-----
app.post('/api3', (req,res) =>{
  //ensure input is a number (if possible)
  const carValue = parseFloat(req.body.car_value);
  const riskRating = parseFloat(req.body.risk_rating);
  //calculate yearly and monthly premium based on values entered
  const yearlyPremium = carValue * riskRating / 100;
  const monthlyPremium = yearlyPremium / 12;
  

  //error handling for all instances
  if (carValue <= 0 || riskRating <= 0 || riskRating > 5 || isNaN(carValue) || isNaN(riskRating)){
    return res
    .status(400)
    .json({error: 'There is an error'})
  }

  else {
    console.log(req.body);
    res
    .status(200)
    .json({
      monthly_premium: parseFloat(monthlyPremium.toFixed(1)),
      yearly_premium: parseFloat(yearlyPremium.toFixed(0)),
    });
  }
});

//----API 4-----



// 4. Export the app for testing later
module.exports = app;