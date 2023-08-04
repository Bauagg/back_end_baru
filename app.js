var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

// import router
const routerProduct = require('./APP/product/routes')
const routerTag = require('./APP/tag/routes')
const routerCategory = require('./APP/category/routes')
const routerUser = require('./APP/user/routes')
const routerDeliveryAddress = require('./APP/delivery_addres/routes')
const routerCart = require('./APP/cart/routes')
const routerInvoice = require('./APP/invoice/routes')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', routerProduct)
app.use('/', routerTag)
app.use('/', routerCategory)
app.use('/', routerUser)
app.use('/', routerDeliveryAddress)
app.use('/', routerCart)
app.use('/', routerInvoice)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
