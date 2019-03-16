const express = require('express');
const router = express.Router();

const tokenAuth = require('../../middleware/tokenAuth');

const User = require('../../models/User');

// @router  GET api/userProfile
// @desc    Get user profile
// @access  Private
router.get('/', tokenAuth, (req, res) => {
  User.findById(req.user.id)
    .select('-password') // Return everything but the password
    .then(user => res.json(user));
});

module.exports = router;
