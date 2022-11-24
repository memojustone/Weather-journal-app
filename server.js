// require express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
// require cors to manage a cross origin requests
const Cors = require("cors");

// enable cors
app.use(Cors());

// require body parser to allow the request body to be parsed as JSON
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Initialize the main project folder
app.use(express.static("website"));

//GET route
app.get("/all", (req, res) => {
  res.send(projectData);
});

// POST route
app.post("/add", (req, res) => {
  projectData = req.body;
  res.send(projectData);
});

// Set up the server
const port = 8000;

const server = app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
