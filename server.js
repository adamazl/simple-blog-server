const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('basic-auth');
const mongoose = require('mongoose');  // Import mongoose

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

// Connect to MongoDB using the connection string from MongoDB Atlas
mongoose.connect(process.env.MONGO_URI || 'your-mongodb-connection-string', {
});

// Define the Blog Post schema and model
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

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

// API route to fetch blog posts from the database
app.get('/api/blog-posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });  // Fetch all posts, sorted by date
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API route to create a new blog post (admin only)
app.post('/api/blog-posts', authenticate, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({ title, content });
    await newPost.save();  // Save the new blog post to MongoDB
    res.status(201).json({ message: 'Blog post created!', post: newPost });
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
