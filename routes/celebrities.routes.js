// starter code 

const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

// all your routes here
router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
  });


router.post('/create', async (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    console.log(req.body)
    try {
    await Celebrity.create({name, occupation, catchPhrase})
      res.redirect('/celebrities')
    } catch (error) {
        res.render('celebrities/new-celebrity')
    }
  })




  router.get("/", async (req, res, next) => {
    try {
      const celebrities = await Celebrity.find({});
      res.render("celebrities/celebrities", { celebrities });
    } catch (error) {
      next(error);
    }
  });


  


module.exports = router