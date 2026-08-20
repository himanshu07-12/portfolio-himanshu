const jwt = require('jsonwebtoken');
const { config } = require('../config/environment');
const { errorResponse } = require('../utils/apiResponse');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(res, 401, 'UNAUTHORIZED', 'Authentication required.');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.admin = decoded;
    next();
  } catch (err) {
    return errorResponse(res, 401, 'UNAUTHORIZED', 'Invalid or expired token.');
  }
};

module.exports = { authenticate };
