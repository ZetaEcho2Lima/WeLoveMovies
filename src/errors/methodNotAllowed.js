function methodNotAllowed(req, res, next) {
    next({
      status: 405,
      message: `GET OUTTA HERE! ${req.method} not allowed for ${req.originalUrl} - WEAK ACCESS PERMISSION!`,
    });
  };
  
  module.exports = methodNotAllowed;