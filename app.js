var express= require('express');
var passport = require('passport');
var passportLocal = require('passport-local');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mysql = require('mysql');
var Sequelize = require('sequelize');
// var db = require('./dbconnect');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(expressSession({
  secret : process.env.SESSION_SECRET || 'secret',
  resave : false,
  saveUninitialized : false,
 }));

app.use(passport.initialize());
app.use(passport.session());

var sequelize = new Sequelize('bug_tracker', 'root', 'ndm0150040', {

  host: 'localhost',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var Users = sequelize.define('users', {
  user_id: Sequelize.INTEGER,
  password: Sequelize.STRING
});

// Users.sync({force: true}).then(function () {
//   // Table created
//   return Users.create({
//     user_id: '511',
//     password: 'pass123'
//   });
// });

passport.use(new passportLocal.Strategy(function(username, password, done) {
  // if(username == password) {
  //   done(null, { id: username, name : username });
  // } else {
  //   done(null, null);
  // }

    Users.findAll({
        // attributes: ['user_id', 'password'],
      where: {
          user_id: username }
    }).then(function(data) {
        if(data[0]) {
            if(data[0].dataValues.password == password) {
                done(null, { id: data[0].dataValues.user_id, pass : data[0].dataValues.password });
            }
            else {
                done(null, null);
            }
        }
        else {
            done(null, null);
        }
    });

}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Query database or cache here!
  done(null, { id : id, name : id });
});

app.get('/', function(req, res) {
  res.render('index', {
    isAuthenticated : req.isAuthenticated(),
    user : req.user
  });
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login',passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Server listening at port "+ port);
});
