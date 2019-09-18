const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./app/models/user');

mongoose.connect(config.database);

const port = process.env.PORT || 8088;
const app = express();

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// signup API
app.get('/setup', function (req, res) {
  var demo = new User({
    name: 'demouser',
    password: 'password',   // TODO: encrypt password
    admin: true
  });
  demo.save(function (err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// API
const apiRoutes = express.Router();

/* /api/authenticate */
apiRoutes.post('/authenticate', function (req, res) {
  User.findOne({
    name: req.body.name
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
      return;
    }
    if (user.password != req.body.password) {
      res.json({
        success: false,
        message: 'Authentication failed. Wrong password.'
      });
      return;
    }

    const { name, password } = user;
    var token = jwt.sign({ name, password }, app.get('superSecret'), {
      expiresIn: '24h'
    });
    res.json({
      success: true,
      message: 'Authentication successfully finished.',
      token: token
    });
  });
});

// Secureing API below
apiRoutes.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
  jwt.verify(token, app.get('superSecret'), function (err, decoded) {
    if (err) {
      return res.json({
        success: false,
        message: 'Invalid token'
      });
    }
    req.decoded = decoded;
    next();
  });
});

/* /api/ */
apiRoutes.get('/', function (req, res) {
  res.json({ message: 'Welcome to API routing' });
});
/* /api/users */
apiRoutes.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    if (err) throw err;
    res.json(users);
  });
});

app.use('/api', apiRoutes);

app.listen(port);
console.log('started http://localhost:' + port + '/');
