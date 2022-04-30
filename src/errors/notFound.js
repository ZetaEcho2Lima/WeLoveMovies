function notFound(req, res, next) {
  next({ status: 404, message: `You probably made a typo or just dont know what you are doing. Or you messed up some code. Regardless, path not found: ${req.originalUrl}` });
}

module.exports = notFound;
