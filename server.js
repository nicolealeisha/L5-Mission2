// 1. Import our app from the app.js file

const app = require("./api1");
const api3 = require("./api3");
const PORT = 3000;

const app = require("./app");


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
