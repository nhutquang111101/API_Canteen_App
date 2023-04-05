var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./configs/configs');
var helmet  = require('helmet');
var xss = require('xss-clean');
var rateLimit = require('express-rate-limit');
var cors = require('cors');

var indexRouter = require('./router/index');
//var usersRouter = require('./routes/users');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(xss());
app.use(cors());

app.use('/api/v1/auth/login',limiter)

mongoose.connect(config.DB_URL+config.DB_NAME);
mongoose.connection.once('open',()=>{
  console.log('Connected!');
}).on('error',()=>{
  console.log('Fail!');
});

app.use('/api/v1', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
