const errorMiddlewareHandler = (err, req, res, next) => {
  //Set your status code
  const errorStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
  //set status code
  res.status(errorStatusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorMiddlewareHandler };
