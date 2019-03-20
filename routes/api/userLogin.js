const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const jwtSecret;
if (process.env.NODE_ENV === 'production') {
  // production env variable
  jwtSecret = process.env.jwtSecret;
}
else {
  jwtSecret = config.jwtSecret;
}

// User model
const User = require('../../models/User');

// @route   POST api/userLogin
// @desc    Login user
// @access  public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields.' });
  }

  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: 'User does not exist. ' });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      // Token includes user id so that when the token is decoded the user id can be pulled from it and used
      jwt.sign(
        { id: user.id },
        jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            }
          });
        }
      );
    });
  });
});

module.exports = router;
