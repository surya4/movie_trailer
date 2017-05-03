var express = require('express');
var mysql = require('mysql');

var router = express.Router();

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'computer',
  database: 'movie_trailer'
});

conn.connect(function(err) {
  if (err) {
    console.log("Error");
  } else {
    console.log("Connected");
  }
});

module.exports = function(app,passport) {

app.get('/',function(req,res){
    res.render('pages/index',{
      qStr: req.query
    });
});

app.get('/title',function(req,res){
  res.render('pages/title');
});

app.post('/title', function(req,res,next) {
  var key = req.body.title;
  console.log("key"+JSON.stringify(req.body));
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
        imdbVotes = rows[0].imdbVotes,
        vidLink = rows[0].tLink;

      res.render('pages/title',{
        name:name.toString(),
        plot:plot.toString(),
        image_link:poster.toString(),
        year:year.toString(),
        rating:rating.toString(),
        releas:releas.toString(),
        dur:dur.toString(),
        genre:genre.toString(),
        director:director.toString(),
        writer:writer.toString(),
        actors:actors.toString(),
        lang:lang.toString(),
        awards:awards.toString(),
        imdbR:imdbR.toString(),
        imdbVotes:imdbVotes.toString(),
        vidLink:vidLink.toString()
      });
        res.end();
  });
 });

 };
