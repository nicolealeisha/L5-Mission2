// 1. Import our app from the app.js file
const app = require("./app");
const api3 = require("./api3");

// 2. Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});