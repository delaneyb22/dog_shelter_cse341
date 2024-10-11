const express = require('express');
const app = express();
const router = require('./routes');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const passport = require('passport');
//const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Define the API endpoints
const dogRouter = require('./routes/dogs');
//const shelterRouter = require('./routes/shelters');
//const authRouter = require('./routes/auth');

app.use('/api/dogs', dogRouter);
//app.use('/api/shelters', shelterRouter);
//app.use('/api/auth', authRouter);

// Connect to MongoDB
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node Running on port ${3000}`);
    });
  }
});

// Export the app
module.exports = app;