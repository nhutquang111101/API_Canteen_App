var createError = require('http-errors');
const express =  require("express");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
var config = require('./configs/config');
var helmet  = require('helmet');
var xss = require('xss-clean');
var rateLimit = require('express-rate-limit');

const indexRouter = require("./routes");
app.use('/api/v1', indexRouter);

//connect DATABASE
mongoose.connect(config.DBURL);
mongoose.connection.once('open',()=>{
  console.log('Connection successful!');
}).on('error',()=>{
  console.log('Fail!');
});

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use('/api/v1/auth/login',limiter)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(xss());
app.use(cors());

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(morgan("common"));

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

app.listen(8000, ()=>{
    console.log("Server is Running...");
});

module.exports = app;