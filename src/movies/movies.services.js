const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at", 
})

function readReviews(movie) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movie.movie_id })
    .then(reviews => reviews.map(review => addCritic(review)))
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function listActiveMovies() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ is_showing: true })
    .groupBy("m.movie_id")
}

function listTheaters(movie) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.*")
    .where({ "m.movie_id": movie.movie_id });
}

function list() {
  return knex("movies").select("*");
}

module.exports = {
  readReviews,
  read,
  listTheaters,
  listActiveMovies,
  list,
}