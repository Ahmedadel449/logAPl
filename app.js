var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const  mongoose = require ('mongoose');


var app = express();


mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/news",
{useNewUrlParser:true , useUnifiedTopology: true}, (err) => {
  if (err){
    console.log(err)
    return
  }else{
    console.log('connecting to DB')
  }
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const user_routes = require("./routers/userrouter");
app.use('aw',user_routes)

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
