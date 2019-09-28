const express = require("express");
const Sequelize = require("sequelize");
const { Router } = require("express");
const bodyParser = require("body-parser");

const router = new Router();

const app = express();

const serverPort = process.env.PORT || 3001;

//assign a password (string) to postgress and port (integer) you are using on your local machine
const password = "secret",
  port = 6544;

const databaseUrl =
  process.env.DATABASE_URL ||
  `postgres://postgres:${password}@localhost:${port}/postgres`;

app.use(bodyParser.json());

const db = new Sequelize(databaseUrl);

const Movie = db.define("movie", {
  title: {
    type: Sequelize.STRING,
    unique: true
  },
  yearOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.STRING
});

db.sync()
  .then(
    Movie.create({
      title: "Battlestar Galactica",
      yearOfRelease: 2004,
      synopsis: `When an old enemy, the Cylons, 
        resurface and obliterate the 12 colonies, 
        the crew of the aged Galactica protect a small 
        civilian fleet - the last of humanity - as they 
        journey toward the fabled 13th colony, Earth.`
    })
  )
  .then(() => console.log("database synced"))
  .catch(console.error);

function getMovies(request, response, next) {
  Movie.findAll()
    .then(movies => response.status(201).send(movies))
    .catch(next);
}
router.get("/movies", getMovies);

function createMovie(request, response, next) {
  Movie.create(request.body)
    .then(movie => response.status(201).send(movie))
    .catch(next);
}
router.post("/movies", createMovie);

function getMovieById(request, response, next) {
  Movie.findByPk(request.params.id)
    .then(event => {
      response.status(201).send(event);
    })
    .catch(next);
}
router.get("/movies/:id", getMovieById);

function updateMovie(request, response, next) {
  Movie.findByPk(request.params.id)
    .then(movie => movie.update(request.body))
    .then(movie => response.status(201).send(movie))
    .catch(next);
}
router.put("/movies/:id", updateMovie);

function deleteMovie(request, response, next) {
  Movie.destroy({ where: { id: request.params.id } })
    .then(movie => response.send({ movie }))
    .catch(next);
}
router.delete("/movies/:id", deleteMovie);

app.use(router);
app.listen(serverPort, () => console.log(`listening on ${serverPort}`));
