const errorMiddlewareHandler = (err, req, res, next) => {
  //Set your status code
  const errorStatusCode = res.statusCode === 200 ? 404 : res.statusCode;
  //set status code
  res.status(errorStatusCode);
  res.json({
    message: err.message,
  });
};

module.exports = { errorMiddlewareHandler };
