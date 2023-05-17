const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRouter = require('./routes/employee');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());



app.use('/api/', usersRouter);

// Apply security middleware
app.use(helmet());

// Apply request rate limiting middleware
const limiter = rateLimit({
  windowMs: 5000, // 5 seconds
  max: 2, // Max 2 requests within the window
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Sanitize user input using XSS filter
app.use((req, res, next) => {
  // Check if request body exists and sanitize each value
  if (req.body) {
    for (let key in req.body) {
      req.body[key] = xss(req.body[key]);
    }
  }
  next();
});


// Start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});