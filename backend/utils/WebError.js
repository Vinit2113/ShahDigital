const throwError = (message, statusCode = 500) => {
  console.log("=-------------",statusCode);
  
  const err = new Error(message);
  err.statusCode = statusCode;
  throw err;
};

module.exports = throwError;
