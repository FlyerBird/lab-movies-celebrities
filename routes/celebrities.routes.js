// starter code 

const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

// all your routes here

/* Create New Celebrity */
router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
  });

/* GET celebrities view */
router.get("/", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find({});
    res.render("celebrities/celebrities", { celebrities });
  } catch (error) {
    next(error);
  }
});


/* Post New Celebrity in DataBase*/
router.post('/create', async (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body; 
    try {
    await Celebrity.create({name, occupation, catchPhrase})
      res.redirect('/celebrities')
    } catch (error) {
        res.render('celebrities/new-celebrity')
    }
  })



  
module.exports = router