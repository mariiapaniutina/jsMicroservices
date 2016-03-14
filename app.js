var express = require('express');
var mysql      = require('mysql');
var seneca = require('seneca')();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

/*
var bdConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'js_micro'
});

bdConnection.query('SELECT * FROM pages', function(err, rows) {
  if (err) throw err;

  console.log('The result is ', rows);
});
*/

seneca.use('mysql-store', {
  name:'js_micro',
  host:'localhost',
  user:'root',
  password:'root',
  port:3306
})

seneca.ready(function () {
  var seneca_page = seneca.make$('pages');
  seneca_page.id  = 4;
  seneca_page.title = "seneca";
  seneca_page.save$(function (err, seneca_page) {
    console.log("seneca_page.id = " + seneca_page.id)
  });


});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
