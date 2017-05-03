var express = require('express');
var app = module.exports = express();
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var passport = require('passport');
var flash    = require('connect-flash');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/db.js');
// require('./config/passport')(passport);
// understand and resolve this
// mysql.connect(configDB.url); // connect to our database

// app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // view engine

// required for passport
app.use(session({ secret: 'tantanatantantantara' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// var router = express.Router();
var routes = require('./routes/index')(app, passport); // understand and resolve this

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

http.createServer(app).listen(1337, function(){
  console.log('Movie trailer is running on port ' + 1337);
});
