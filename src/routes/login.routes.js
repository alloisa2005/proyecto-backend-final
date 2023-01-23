
const { Router } = require('express');
const router = Router();
const passport = require('passport');

const { logger_info } = require('../logs/log_config');
const CartController = require('../controllers/cart.controller.mongo')
const ProductController = require('../controllers/product.controller.mongo')

////////////// Middlewares //////////////
const { isLogged, isNotLogged } = require('../middlewares/validaciones')

router.get('/', isLogged, async (req, res) =>{    
  
  let prods = await ProductController.getAll();      
  res.render('homes.ejs', {user: req.user, productos: prods.result});
});

router.get('/register', isNotLogged, (req, res) =>{
  res.render('register.ejs');
});

router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/login',
  failureRedirect: '/register',
  failureFlash: true
}));

router.get('/login', isNotLogged, (req, res) =>{
  res.render('login.ejs');
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', (req, res, next) => {

  logger_info.info(`Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" accedida - Email: ${req.user.email} - User: ${req.user.nombre} cerró sesión.`);  

  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }        
    res.redirect('/login');
  });
  
});
  
module.exports = router;