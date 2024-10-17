const express = require('express');
const auth = require('basic-auth');
const path = require('path');

const app = express();

// Authentication function to check username and password
const authenticate = (req, res, next) => {
  const user = auth(req); // Get the user credentials from the request

  // Check if the user is authenticated
  if (!user || user.name !== 'admin' || user.pass !== 'password123') {
    res.set('WWW-Authenticate', 'Basic realm="Secure Area"'); // Prompt for credentials
    return res.status(401).send('Access denied');
  }

  next(); // User is authenticated, move to the next middleware
};

// Apply authentication middleware to all routes
app.use(authenticate);

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
