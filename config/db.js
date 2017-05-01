var mysql = require('mysql');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'computer',
  database: 'movie_trailers'
});

conn.connect(function(err) {
  if (err) {
    console.log("Error");
  } else {
    console.log("Connected");
  }
});
