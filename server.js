const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('basic-auth');
const { MongoClient } = require('mongodb');  // Import MongoClient from mongodb

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

let db;
const mongoUri = process.env.MONGO_URI || 'your-mongodb-connection-string';

// Connect to MongoDB using native MongoClient
MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db();  // Use the default database
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error(err));

// Use environment variables for admin username and password
const username = process.env.ADMIN_USERNAME || '';
const password = process.env.ADMIN_PASSWORD || '';

// Middleware for basic authentication on the admin page
const authenticate = (req, res, next) => {
  const user = auth(req);
  if (!user || user.name !== username || user.pass !== password) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Access denied. Admins only.');
  }
  next();
};

// API route to fetch blog posts from MongoDB
app.get('/api/blog-posts', async (req, res) => {
  try {
    const posts = await db.collection('posts').find().sort({ date: -1 }).toArray();  // Fetch all posts, sorted by date
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API route to create a new blog post (admin only)
app.post('/api/blog-posts', authenticate, async (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    title,
    content,
    date: new Date(),
  };
  try {
    const result = await db.collection('posts').insertOne(newPost);  // Insert new post into MongoDB
    res.status(201).json({ message: 'Blog post created!', post: result.ops[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve admin page (authentication required)
app.get('/admin', authenticate, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
