var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var env = require('node-env-file');

var app = express();

// if in development mode, load .env variables
if (app.get("env") === "development") {
  env(__dirname + '/.env');
}

// connect to database
app.db = mongoose.connect(process.env.MONGODB_URI);

// view engine setup - this app uses Hogan-Express
// https://github.com/vol4ok/hogan-express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('layout', 'layout');
app.engine('html', require('hogan-express'));;

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Base routes location file for different projects/version
var routes = require('./routes/index');
var routes_USER_1_0 = require('./routes/_USER.1.0/index');
var routes_TODO_1_0 = require('./routes/_TODO.1.0/index');

//Multiple routes structure for different projects/versions
app.use('/', routes);

// API Interface related to the User data fetch and update
app.use('/users/v1', routes_USER_1_0);
app.use('/todos/v1', routes_TODO_1_0);

//Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next(err);
});

// development error handler : will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler : no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
