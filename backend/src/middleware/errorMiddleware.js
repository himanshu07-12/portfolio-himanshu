const { errorResponse } = require('../utils/apiResponse');
const { config } = require('../config/environment');

const notFoundHandler = (req, res) => {
  return errorResponse(res, 404, 'NOT_FOUND', `Route not found: ${req.method} ${req.originalUrl}`);
};

const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.url}:`, err.message || err);

  if (config.env === 'development' && err.stack) {
    console.error(err.stack);
  }

  const statusCode = err.statusCode || err.status || 500;
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  const message = statusCode === 500 && config.env === 'production'
    ? 'An unexpected internal server error occurred.'
    : (err.message || 'Server error');

  return errorResponse(res, statusCode, errorCode, message);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
