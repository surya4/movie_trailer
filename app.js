var express = require('express');
var http = require('http');
var path = require('path');
var mysql = require('mysql');

var bodyParser = require('body-parser');
var app = express();

// app.use(bodyParser());
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'computer',
  database: 'movie_trailers'
});
conn.connect(function(error) {
  if (!!error) {
    console.log("Error");
  } else {
    console.log("Connected");
  }
});

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// static files
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
    res.render('pages/index',{
      qStr: req.query
    });
});

app.get('/title',function(req,res){
  res.render('pages/title');
});

app.post('/title',urlencodedParser, function(req,res) {
  var key = req.body.title;
  var queryString = "SELECT * FROM data where title like '%"+key+"%'";
  conn.query(String(queryString),function (err,rows) {
    if (err) throw err;
    // var plot = rows[0][2];
    var plot = rows[0].Plot;
      res.write(plot);
        res.end();
  });
 });


http.createServer(app).listen(1337, function(){
  console.log('Express server listening on port ' + 1337);
});
