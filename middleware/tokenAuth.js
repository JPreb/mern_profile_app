const config = require('config');
const jwt = require('jsonwebtoken');

function tokenAuth(req, res, next) {
  // Getting token from payload object: req = { headers: { 'Content-type' : 'application/json', 'x-user-token' : 'token' } }
  const token = req.header('user-token');

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied.' });

  try {
    // Verify token
    const decodedToken = jwt.verify(token, config.get('jwtSecret'));
    // Decoded token contains user id, creation time of token, & expiration time of token; add this to payload
    req.user = decodedToken;
    // Call the profile route function
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid.' });
  }
}

module.exports = tokenAuth;
