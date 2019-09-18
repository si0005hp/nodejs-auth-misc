const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const User1 = {
  name: "Taro",
  password: "Taro123"
};


passport.use(new LocalStrategy(
  (username, password, done) => {

    if (username !== User1.name) {
      return done(null, false, { message: 'User does not exist' });
    } else if (password !== User1.password) {
      return done(null, false, { message: 'Password incorrect' });
    } else {
      return done(null, { username: username, password: password });
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.use(passport.initialize());
router.use(passport.session());
router.use(flash());


router.get('/', (req, res) => {
  console.log(req.session);
  res.render('index', { user: req.user });
});

router.get('/failure', (req, res) => {
  console.log(req.session);
  res.render('index', { messages: req.flash('error') });
});

router.get('/success', (req, res) => {
  console.log(req.session);
  res.redirect('/');
});

router.post('/',
  passport.authenticate('local',
    {
      failureRedirect: '/failure',
      successRedirect: '/success',
      failureFlash: true
    }
  )
);

router.post('/logout', (req, res) => {
  req.session.passport.user = undefined;
  res.redirect('/');
});

module.exports = router;