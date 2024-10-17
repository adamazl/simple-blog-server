# Simple Blog Server

A basic blog site built with Node.js and Express. The home page displays blog posts, and the admin page allows users to upload new posts. Authentication is implemented for the admin page using basic HTTP authentication.

## Features

- View blog posts on the homepage.
- Admin page for creating and uploading new blog posts.
- Blog posts are stored in a simple JSON file for persistence.

## Live Demo

You can view the live demo of the project here:  
👉 [Simple Blog Server on Railway](https://simple-http-server.up.railway.app)

## Installation

To run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/simple-blog-server.git
   cd simple-blog-server
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the server:

   ```bash
   npm start
   ```

   The server will be running on `http://localhost:3000/`.

## Admin Access

To access the admin page, visit `/admin` on the server. Use the following credentials to log in:

- **Username**: `admin`
- **Password**: `password123`

You can update the admin credentials by setting the following environment variables:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

## API Endpoints

- `GET /api/blog-posts`: Retrieve a list of all blog posts.
- `POST /api/blog-posts`: Create a new blog post (admin only).

## Deployment

This project is hosted on [Railway](https://railway.app). To deploy it yourself:

1. Create a new project on Railway.
2. Connect your GitHub repository.
3. Railway will automatically detect and deploy the app.

## License

This project is licensed under the MIT License.
