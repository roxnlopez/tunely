/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */ 


/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */

$(document).ready(function() {
  console.log('now ok to look for elements');

  $.get('http://localhost:3000/api/albums').done(function (data) {
      var kanyeAlbums = data;
      kanyeAlbums.forEach(function (kanyeAlbum) {
        renderAlbum(kanyeAlbum);
      });
      //apply id 
      $('.album').on('click', '.add-song', function(e) {
        var id = $(this).parents('.album').data('album-id');
        console.log(id);
        $('#songModal').data('album-id', id);
        $('#songModal').modal();
      });
      $('#saveSong').on('click', function handleNewSongSubmit(){
          var id = $(this).parents('#songModal').data('album-id');
          $('#saveSong').data('album-id', id);
          $('#saveSong').modal();
          var newSong = $('#songName').val();
          var theTrack = $('#trackNumber').val();
          console.log(newSong);
          console.log(theTrack);
          console.log(id);
          // whenver you save a new song, it saves not just the name but also the track

          $.ajax({
            type: 'POST',
            url: '/api/albums/' + id + '/songs',
            datatype: 'json',
            data: {
              name: newSong,
              trackNumber: theTrack
            },
            success: function() {
              console.log('yay!');
            }
          });
      });
  });

  //create on sumit for form
  $("form").on("submit", function(event) {
    event.preventDefault();
    //put serialize inside function
    var formData = $(this).serialize();
    console.log(formData);
    //ajax call to post to serialize the data
    $.ajax({
      type: 'POST',
      url: '/api/albums',
      datatype: 'json',
      data: formData
    });
    //reset submit
    $(this).trigger("reset");
   });
});

// this function takes a single album and renders it to the page
function renderAlbum(album) {
  var listOfSongs = "";
  album.songs.forEach(function(song) {
    listOfSongs = listOfSongs + "-" + song.name;
  });



  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" +  album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +
  "                     <li class='list-group-item'>" +
  "                       <h4 class='inline-header'>Songs:</h4>"  +
  "                       <span>  - (1) Famous - (2) All of the Lights - (3) Guilt Trip - (4) Paranoid - (5) Ultralight Beam - (6) Runaway - (7) Stronger - </span>" +
  "                     </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "                <button class='btn btn-primary add-song'>Add Song</button>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

  // render to the page with jQuery
  $("#albums").append(albumHtml);

}