
// 1. Require express
const express = require("express");

// 2. Create the new express app instance for our API
const app = express();

// 3. Define routes
app.get("/greet", (req, res) => {
  const name = req.query.name || "World";
  res.json({ message: `Hello, ${name}!` });
});





// 4. Export the app for testing later
module.exports = app;