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
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));


app.get('/',function(req,res){
    res.render('pages/index',{
      qStr: req.query
    });
});

app.get('/title',function(req,res){
  res.render('pages/title');
});

app.post('/title',urlencodedParser, function(req,res,next) {
  var key = req.body.title;
  // console.log("key"+JSON.stringify(req.body));
  var queryString = "SELECT * FROM data where title like '%"+key+"%'";
  conn.query(String(queryString),function (err,rows) {
    if (err) throw err;
    var name = rows[0].Title,
        year = rows[0].Year,
        rating = rows[0].Rated,
        releas = rows[0].Released,
        dur = rows[0].Runtime,
        genre = rows[0].Genre,
        director = rows[0].Director,
        writer = rows[0].Writer,
        actors = rows[0].Actors,
        plot = rows[0].Plot,
        lang = rows[0].Language,
        awards = rows[0].Awards,
        poster = rows[0].Poster,
        imdbR = rows[0].imdbRating,
        imdbVotes = rows[0].imdbVotes;
    console.log(rows);
      // res.write(name);
      res.render('pages/title',{
        name:name.toString(),
        plot:plot.toString(),
        image_link:poster.toString()
      });
        res.end();
  });
 });




http.createServer(app).listen(1337, function(){
  console.log('Express server listening on port ' + 1337);
});
