# Simple HTTP Server

This is a simple HTTP server that can respond to `GET` and `HEAD` requests. It's written in Node.js, and you can use it to serve basic HTTP responses.

## Features
- Handles `GET` requests by returning a "Hello, World!" message.
- Handles `HEAD` requests by sending only the headers.
- Easily customizable for different responses or endpoints.

## Requirements
- [Node.js](https://nodejs.org/) (v12 or higher)

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Node.js (if not already installed)**:
   Download and install Node.js from [here](https://nodejs.org/).

3. **Run the server**:
   Run the following command in your terminal to start the server:
   ```bash
   node server.js
   ```

   The server will be running at `http://127.0.0.1:3000/`.

## How to Use

### GET Request
You can make a `GET` request by visiting the following URL in your browser or using a tool like `curl`:

```bash
curl http://127.0.0.1:3000/
```

This will return:
```
Hello, World!
```

### HEAD Request
You can make a `HEAD` request like this:

```bash
curl -I http://127.0.0.1:3000/
```

This will return the headers only, without the body.

## Customization
To customize the response of the server, open the `server.js` file and modify the content in the following section:

```javascript
if (req.method === 'GET') {
  res.end('Hello, World!\n');  // Change this message to whatever you like
}
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
