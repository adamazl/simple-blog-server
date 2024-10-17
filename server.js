const express = require('express');
const auth = require('basic-auth');
const path = require('path');

const app = express();

// Middleware for basic authentication on the admin page
const authenticate = (req, res, next) => {
  const user = auth(req);
  if (!user || user.name !== 'admin' || user.pass !== 'password123') {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Access denied. Admins only.');
  }
  next();
};

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Home route (no authentication required)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Admin route (requires authentication)
app.get('/admin', authenticate, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
