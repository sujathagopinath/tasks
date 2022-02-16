const errorMiddlewareHandler = (err, req, res, next) => {
  const errorStatusCode = res.statusCode === 200 ? 404 : res.statusCode;
  res.status(errorStatusCode);
  res.json({
    message: err.message,
  });
};

module.exports = { errorMiddlewareHandler };
