const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.mongo')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( async(id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
});

passport.use('local-signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done)=>{
  
    let user = await UserModel.findOne({ email: email});
    if(user) return done(null, false, { message: 'Email ya registrado'});
    
    let hashedPassword = await bcrypt.hash(password, 12);

    user = new UserModel();
    user.email= email;
    user.password = hashedPassword;
    user.nombre = req.body.name;
    user.direccion = req.body.direccion;
    user.edad = req.body.edad;
    user.telefono = req.body.telefono;
    user.foto = req.body.foto;

    await user.save();
    done(null, user);  
}))

