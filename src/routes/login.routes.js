
const { Router } = require('express');
const router = Router();
const passport = require('passport');

const { logger_info, logger_error } = require('../logs/log_config');

////////////// Middlewares //////////////
const { isLogged, isAdmin } = require('../middlewares/validaciones')

router.get('/', (req, res) =>{
  res.render('home.ejs');
});

router.get('/register', (req, res) =>{
  res.render('register.ejs');
});

router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/login',
  failureRedirect: '/register',
  failureFlash: true
}));

router.get('/login', (req, res) =>{
  res.render('login.ejs');
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    res.redirect('/login');
  });
});

module.exports = router;