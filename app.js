var express= require('express');
var passport = require('passport');
var passportLocal = require('passport-local');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

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

passport.use(new passportLocal.Strategy(function(username, password, done) {
  if(username == password) {
    done(null, { id: username, name : username });
  } else {
    done(null, null);
  }
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
