// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
//require body-parser
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

/************
 * DATABASE *
 ************/
 var db = require('./models');

/* hard-coded data */
var albums = [];
albums.push({
              _id: 132,
              artistName: 'the Old Kanye',
              name: 'The College Dropout',
              releaseDate: '2004, February 10',
              genres: [ 'rap', 'hip hop' ]
            });
albums.push({
              _id: 133,
              artistName: 'the New Kanye',
              name: 'The Life of Pablo',
              releaseDate: '2016, Febraury 14',
              genres: [ 'hip hop' ]
            });
albums.push({
              _id: 134,
              artistName: 'the always rude Kanye',
              name: 'My Beautiful Dark Twisted Fantasy',
              releaseDate: '2010, November 22',
              genres: [ 'rap', 'hip hop' ]
            });
albums.push({
              _id: 135,
              artistName: 'the sweet Kanye',
              name: '808s & Heartbreak',
              releaseDate: '2008, November 24',
              genres: [ 'r&b', 'electropop', 'synthpop' ]
            });



/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

app.get('/api/albums', function album_index(req, res){
  db.Album.find({}, function(err, albums) {
    res.json(albums);
  });
});

app.post('/api/albums', function album_new (req,res) {
  console.log(req.body.genres);
  db.Album.create(req.body, function(err, album) {
    if (err) {
      res.send("error!");
    }
    var genres = req.body.genres.split(", ");
    console.log(req.body.genres);
    res.json(album);
  });
});

app.post('/api/albums/:album_id/songs', function album_index(req, res){
  console.log(req.params.album_id.songs);
  db.Album.findOne({_id: req.params.album_id}, function(err, album) {
    console.log(req.body);
    album.songs.push({name: req.body.name, trackNumber: req.body.trackNumber});
    console.log(album);
    album.save();
    res.json(album);
  });
});

// app.get('/api/albums/:album_id', function (req,res) {
//   db.Album.find(req.bodys, function(err, album) {
//     // if (err) {
//     //   res.send("error!");
//     // }
//     // var songs = req.body.push();
//     songs.push(req.body);
//     console.log(req.body.songs);
//     res.json(album);
//   });
// });

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
