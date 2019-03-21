const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const app = express();

// Express body parser
app.use(express.json());

// Database URI
var db;
if (process.env.NODE_ENV === 'production') {
  db = process.env.mongoURI;
} else {
  db = config.get('mongoURI');
}

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/userReg', require('./routes/api/userReg'));
app.use('/api/userLogin', require('./routes/api/userLogin'));
app.use('/api/user', require('./routes/api/user'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Use PORT for heroku deployment or 5000 for local hosting
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
