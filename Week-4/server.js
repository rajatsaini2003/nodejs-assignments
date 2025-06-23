// server.js

const express = require('express');
const app = express();
const PORT = 3000;

//  Middleware 
const middleware = (req, res, next) => {
  console.log(`[${new Date()}] ${req.method} ${req.url}`);
  next();
}

//  Built-in middleware for JSON body parsing 
app.use(express.json());

//  Route 1: Home 
app.get('/', middleware,(req, res) => {
  res.send('Welcome to the Express server!');
});

//  Route 2: About 
app.get('/about', middleware,(req, res) => {
  res.send('This is the About page.');
});

//  Route 3: Example POST endpoint 
app.post('/data', middleware,(req, res) => {
  const data = req.body;
  res.json({ message: 'Data received', data });
});

//  404 Handler 
app.use((req, res) => {
  res.status(404).send('Page not found');
});

//  Start the server 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
