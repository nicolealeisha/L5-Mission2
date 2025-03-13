const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


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

  //error handling
  if (isNaN(carValue) || isNaN(riskRating)){
    return res
    .status(400)
    .json({error: 'Please enter a numerical value for car value and risk rating'})
  }

  if (carValue <= 0){
    return res
    .status(400)
    .json({error: 'Please enter a valid car value above 0'})
  }

  if (riskRating <= 0 || riskRating > 5 ){
    return res
    .status(400)
    .json({error: 'Please enter a risk rating between 1 and 5'})
  }

  //success handling
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



// 4. Export the app 
module.exports = app;