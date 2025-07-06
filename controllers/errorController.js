const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err, // Full error object
    message: err.message,
    stack: err.stack
  });
};

// Production Mode Error Sender
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

// Handle Mongoose Cast Error
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  const error = new Error(message);
  error.statusCode = 400;
  error.status = 'fail';
  error.isOperational = true;
  return error;
};

// Handle Duplicate Fields
const handleDuplicateFieldsDB = err => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  const error = new Error(message);
  error.statusCode = 400;
  error.status = 'fail';
  error.isOperational = true;
  return error;
};

// Handle Validation Error
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  const error = new Error(message);
  error.statusCode = 400;
  error.status = 'fail';
  error.isOperational = true;
  return error;
};

// Handle JWT Error
const handleJWTError = () => {
  const error = new Error('Invalid token. Please log in again!');
  error.statusCode = 401;
  error.status = 'fail';
  error.isOperational = true;
  return error;
};

// Handle Expired Token
const handleJWTExpiredError = () => {
  const error = new Error('Your token has expired! Please log in again.');
  error.statusCode = 401;
  error.status = 'fail';
  error.isOperational = true;
  return error;
};

// =================== MAIN MIDDLEWARE ====================
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};





