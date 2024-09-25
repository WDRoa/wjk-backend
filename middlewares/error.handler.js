const logErrors = (err, request, response, next) => {
  console.error(err);
  next(err);
};

const errorHandler = (err, request, response, next) => {
  response.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

const boomErrorHandler = (err, request, response, next) => {
  if (err.isBoom) {
    const { output } = err;
    response.status(output.statusCode).json(output.payload);
  }else {
		next(err);
	}
};

module.exports = { logErrors, errorHandler, boomErrorHandler };
