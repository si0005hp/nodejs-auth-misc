const express = require('express');
const session = require('express-session');

const app = express();
app.set('view engine', 'hbs');
app.use(express.urlencoded( { extended: false }));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
}));

app.use('/', require('./routes/index'));
app.listen(3060, console.log('Server listening port 3060...'));