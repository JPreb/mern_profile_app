const config = require('config');
const jwt = require('jsonwebtoken');

var jwtSecret;
if (process.env.NODE_ENV === 'production') {
  jwtSecret = process.env.jwtSecret;
} else {
  jwtSecret = config.get('jwtSecret');
}

function tokenAuth(req, res, next) {
  // Getting token from payload header object
  const token = req.header('user-token');

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied.' });

  try {
    // Verify and decode token
    const decodedToken = jwt.verify(token, jwtSecret);
    // Decoded token contains user id, creation time of token, & expiration time of token; add this to payload
    req.user = decodedToken;
    // Call the profile route function
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid.' });
  }
}

module.exports = tokenAuth;
