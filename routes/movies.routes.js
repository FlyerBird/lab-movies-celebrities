// starter code 
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

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

  router.post('/:movieId/delete', async (req, res, next) => {
    const { movieId } = req.params;
    try {
        await Movie.findByIdAndDelete(movieId)
        res.redirect('/movies')
    } catch (error) {
        next(error)
    }
})



module.exports = router;