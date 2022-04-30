const service = require("./movies.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found: ${movieId}.` });
}

async function readReviews(req, res) {
  const { movie } = res.locals;
  const data = await service.readReviews(movie);
  res.json({ data });
}

async function read(req, res) {
  const { movie } = res.locals;
  res.json({ data: movie });
}

async function listTheaters(req, res) {
  const { movie } = res.locals;
  const data = await service.listTheaters(movie);
  res.json({ data })
}

async function list(req, res) {
  const { is_showing } = req.query;
  let data = undefined;
  !is_showing ? data = await service.list() : data = await service.listActiveMovies();
  res.json({ data });
}

module.exports = {
  readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviews)],
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
  list: asyncErrorBoundary(list),
};