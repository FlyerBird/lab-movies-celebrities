// starter code 
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your  GET routes here

/* Create New Movie */

router.get("/create", async (req, res, next) => {
    try {
      const celebrities = await Celebrity.find({});
      res.render("movies/new-movie", { celebrities });
    } catch (error) {
      next(error);
    }
  });


  /* GET movies view */
  router.get('/', async (req, res, next) => {
    try {
        const movies = await Movie.find({});
        res.render('movies/movies', { movies })
    } catch (error) {
        next(error)
    }
})
  
// all your  POST routes here
  /* Post New Movie in DataBase*/
  router.post("/create", async (req, res, next) => {
  
    const { title, genre, plot, cast } = req.body;
    try {
      await Movie.create({ title, genre, plot, cast });
      res.redirect("/movies");
    } catch (error) {
      next(error);
      res.redirect("/movies/create");
    }
  });


  // all your  DYNAMIC routes here
   /* GET movies Id route */
   router.get("/:movieId", async (req, res, next) => {
    const { movieId } = req.params;
    try {
      const movies = await Movie.findById(movieId).populate("cast");
      res.render("movies/movie-details", {movies});
    } catch (error) {
      next(error);
    }
  });

  /* Delete Movie*/
  router.post('/:movieId/delete', async (req, res, next) => {
    const { movieId } = req.params;
    try {
        await Movie.findByIdAndDelete(movieId)
        res.redirect('/movies')
    } catch (error) {
        next(error)
    }
})

/* Edit Movie*/
router.get("/:movieId/edit", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movies = await Movie.findById(movieId);
    const celebrity = await Celebrity.find({})
    res.render('movies/edit-movie', movies, { celebrity })
  } catch (error) {
    next(error);
  }
});


module.exports = router;