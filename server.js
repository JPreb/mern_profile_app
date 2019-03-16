const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

// Express body parser
app.use(express.json());

// Database URI
const db = config.get('mongoURI');

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
app.use('/api/userProfile', require('./routes/api/userProfile'));

// Use PORT for heroku deployment or 5000 for local hosting
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
