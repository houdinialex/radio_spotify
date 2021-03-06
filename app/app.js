/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
// var jsdom = require('jQuery');
// var jsdom = require("jsdom");
// var window = jsdom.jsdom().parentWindow;
//
// jsdom.jQueryify(window, "http://code.jquery.com/jquery-2.1.3.min.js", function () {
//   var $ = window.$;
//   $("body").prepend("<h1>The title</h1>");
//   console.log($("h1").html());
// });

var request = require('request');
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = 'CLIENT_ID'; // Your client id
var client_secret = 'CLIENT_SECRET'; // Your secret
var redirect_uri = 'REDIRECT_URI'; // Your redirect uri

var headers = {
  'Authorization': 'Bearer YOUR_TOKEN',
  "Content-Type" : "application/json"
}

//These hold the values that really do all the work. Instantiating, but will be overwritten.
var currentPlaylist = 1;
var lastPlaylist = 0;
var currentVolume = 100;
var lastVolume = 0;

// Configure the request
var optionsPlaylists = {
    url: 'https://api.spotify.com/v1/users/YOUR_USER_ID/playlists',
    method: 'GET',
    headers: headers
}


var positionBody = JSON.stringify({
  position: 1
});

//Please before running the app follow these playlists on your spotify accout:
var myArray = {
  "1": "Release Radar",
  "2": "Discover Weekly",
  "3": "Today's Top Hits",
  "4": "New Music Friday",
};

var arrayId = 2; // < ------------------------------------------ Temp value right now, will be overwritten.
var someOtherValue = 10; // < ---------------------------------- Temp value right now, will be overwritten.

function callSpotify(error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        //console.log(body)
        //console.log("Call Spotify called");
        //console.log("Array number being called: " + arrayId);
        var response = JSON.parse(body);
        for (i = 0; i < response.items.length; i++ ) {
          // console.log(myArray);
          if (response.items[i].name === myArray[arrayId]) {
            var playlist = response.items[i];

            var obj = { "context_uri":"spotify:user:spotify:playlist:" + playlist.id,
            "offset": {"position": someOtherValue}};
            var putBody = JSON.stringify(obj);

            console.log(playlist.name);

            var optionsJustOnePlaylist = {
                url: 'https://api.spotify.com/v1/me/player/play',
                method: 'PUT',
                headers: headers,
                qs: {'device_id	': 'YOUR_DEVICE_ID'}
            }

            request(optionsJustOnePlaylist, function(error, response, body) {
              //console.log("Success: Playlist function called);
              console.log(putBody);
            }).end(putBody);


          }
        }
    }
}
// Start the request
//request(optionsPlaylists, callSpotify); //<----------------------------- You can do some basic configuration stuff before interacting w/ the HW, note to self: look into this for global shuffle controls etc?

//-------------------------------------------------------------------------
//ALL THE SERIAL COMMUNICATION ++ CALLS TO SPOTIFY HAPPEN HERE
//-------------------------------------------------------------------------


var SerialPort = require('serialport');
  //The SeiralPort('YOUR_OWN_SERIALPORT_WHERE_HARDWARE_IS_CONNECTED')
  var port = new SerialPort('/dev/cu.usbmodem2462301', {
    baudRate: 57600
  });

  port.on('open', () => {
    console.log('Port Opened');
  });

  var playlists = 4;

  port.on('data', (data) => {
    /* get a buffer of data from the serial port */
    //console.log(data.toString());

    if((data.toString() >= 0) && (data.toString()<=1000)){
      currentPlaylist = data.toString();
      currentPlaylist = parseInt(((currentPlaylist - 0) / (1000 - 0) * (playlists + 1 - 1) + 1));
      //getPlaylists(currentPlaylist);
    } else if ((data.toString()>=1001) && (data.toString()<=2000)) {
      currentVolume = data.toString();
      currentVolume = parseInt((currentVolume-1000)/10);
    } else {
      console.log('unknown serial O.o :: ' + data.toString());
    }

    // console.log('Playlist: ', currentPlaylist);
    // console.log('Volume: ', currentVolume);

    //Playlist stuff below.

    if(lastPlaylist != currentPlaylist){
<<<<<<< HEAD

    //console.log(playlistIDs[currentPlaylist - 1]);
    //console.log("am I running?");
=======
    //console.log("Playlist change to be called now");
>>>>>>> 7108f7b57183b0b1a2fc52c9d9154758ff966f37

    request(optionsPlaylists, callSpotify);
    arrayId = currentPlaylist;
    someOtherValue = parseInt(Math.random() * 30);
   //console.log('Track to be called from the playlist: ' + someOtherValue);
    lastPlaylist = currentPlaylist;
    } else {
      //...
      // chill, do nothing.
      //...
    }

    //Volume stuff below.

    if(Math.abs(lastVolume - currentVolume)>5){ // <---------------- Crappy debounce, hackathon style ;)
    //change the volume of the app to the current volume :)

    // Configure the request
    var volumePlay = {
      url: 'https://api.spotify.com/v1/me/player/volume',
      method: 'PUT',
      headers: headers,
      qs: {'device_id	': 'YOUR_DEVICE_ID', 'volume_percent' : currentVolume}
    }

    request(volumePlay, function(error, response, body) {
      //console.log("success - called volumePlay");
      //console.log(body);

    }).end();

      lastVolume = currentVolume;

      console.log("Volume changed to: " + currentVolume);
    } else {
      //...
      //chill, nothing to do.
      //...
    }

  });


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
<<<<<<< HEAD
=======

//----------------------------------------------------------------------------------------------------
>>>>>>> 7108f7b57183b0b1a2fc52c9d9154758ff966f37
