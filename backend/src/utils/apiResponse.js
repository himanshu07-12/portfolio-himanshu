const successResponse = (res, statusCode = 200, data = null, meta = null) => {
  const response = {
    success: true,
    data,
  };
  if (meta) {
    response.meta = meta;
  }
  return res.status(statusCode).json(response);
};

const errorResponse = (res, statusCode = 500, code = 'INTERNAL_ERROR', message = 'An unexpected error occurred', details = null) => {
  const errorObj = {
    code,
    message,
  };
  if (details) {
    errorObj.details = details;
  }
  return res.status(statusCode).json({
    success: false,
    error: errorObj,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
