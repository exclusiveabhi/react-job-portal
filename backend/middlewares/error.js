class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  if (typeof err === 'string') {
    return res.status(500).json({
      success: false,
      message: err
    });
  }
  
  let error = { ...err };
  error.message = err.message || "Internal Server Error";
  error.statusCode = err.statusCode || 500;

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    error = new ErrorHandler(message, 400);
  }
  
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    error = new ErrorHandler(message, 400);
  }
  
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again please!`;
    error = new ErrorHandler(message, 400);
  }
  
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again please!`;
    error = new ErrorHandler(message, 400);
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export default ErrorHandler;
