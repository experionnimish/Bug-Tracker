/*
 * Module dependencies
 */
var express = require('express')
  // , stylus = require('stylus')
  // , nib = require('nib')
  , logger = require('morgan');

  var app = express()

  // function compile(str, path) {
  //   return stylus(str)
  //     .set('filename', path)
  //     .use(nib())
  // }

  app.set('views', __dirname + '/views')
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'ejs');
  // app.set('view engine', 'jade')
  app.use(logger('dev'))
  // app.use(stylus.middleware(
  //   { src: __dirname + '/public'
  //   , compile: compile
  //   }
  // ))
  app.use(express.static(__dirname + '/public'))

  app.get('/', function (req, res) {
  res.render('index.html')
})
app.listen(3000)
