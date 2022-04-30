const res = require("express/lib/response");

function errorHandler(error, request, res, next) {
  const { status = 500, message = "You done goofed up somethin'" } = error;
  res.status(status).json({ error: message });
}

module.exports = errorHandler;
