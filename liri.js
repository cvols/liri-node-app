var nodeKeys = require('./keys.js');

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var command = process.argv[2];
var search = '';

if (command === 'my-tweets') {
    twitterTwitter();
} if (command === 'spotify-this-song') {
    spotifySpotify();
} if (command === 'movie-this') {
    omdbOMDB();
} if (command === 'do-what-it-says') {
    doWhatItSays();
}

function twitterTwitter() {
    var client = new Twitter({
        consumer_key: nodeKeys[0].consumer_key,
        consumer_secret: nodeKeys[0].consumer_secret,
        access_token_key: nodeKeys[0].access_token_key,
        access_token_secret: nodeKeys[0].access_token_secret
    });

    var params = { screen_name: 'chris_volonnino' };
    client.get('search/tweets', { q: 'chris_volonnino' }, function (error, tweets, response) {
        if (error) {
            console.log(error)
        }

        for (i = 0; i < tweets.statuses.length; i++) {
            console.log('I tweeted ' + tweets.statuses[i].text + ' on ' + tweets.statuses[i].created_at);
        };
    });
}

function spotifySpotify() {
    for (var i = 3; i < process.argv.length; i++) {
        search = search + process.argv[i] + " ";
    }

    var spotify = new Spotify({
        id: nodeKeys[1].id,
        secret: nodeKeys[1].secret
    });

    if (search != '') {
        spotify.search({ type: 'track', query: search, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log('Artist: ' + data.tracks.items[0].artists[0].name)
            console.log('Song name: ' + data.tracks.items[0].name)
            console.log('Link to song: ' + data.tracks.items[0].external_urls.spotify)
            console.log('Album name: ' + data.tracks.items[0].album.name)
        });
    } else {
        spotify.search({ type: 'track', query: 'Ace of Base The Sign', limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log('Artist: ' + data.tracks.items[0].artists[0].name)
            console.log('Song name: ' + data.tracks.items[0].name)
            console.log('Link to song: ' + data.tracks.items[0].external_urls.spotify)
            console.log('Album name: ' + data.tracks.items[0].album.name)
        });
    }
}

function omdbOMDB() {
    for (var i = 3; i < process.argv.length; i++) {
        search = search + process.argv[i] + "&";
    }

    if (search != '') {
        var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=40e9cece";

        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log('Movie title: ' + JSON.parse(body).Title)
                console.log('Release year: ' + JSON.parse(body).Year)
                console.log('IMDB rating: ' + JSON.parse(body).Ratings[0].Value)
                console.log('Rotten Tomatoes rating: ' + JSON.parse(body).Ratings[1].Value)
                console.log('Country movie was produced: ' + JSON.parse(body).Country)
                console.log('Language: ' + JSON.parse(body).Language)
                console.log('Plot: ' + JSON.parse(body).Plot)
                console.log('Actors: ' + JSON.parse(body).Actors)
            }
        })
    } else {
        var queryUrl = "http://www.omdbapi.com/?t=" + 'Mr Nobody' + "&y=&plot=short&apikey=40e9cece";

        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log('Movie title: ' + JSON.parse(body).Title)
                console.log('Release year: ' + JSON.parse(body).Year)
                console.log('IMDB rating: ' + JSON.parse(body).Ratings[0].Value)
                console.log('Rotten Tomatoes rating: ' + JSON.parse(body).Ratings[1].Value)
                console.log('Country movie was produced: ' + JSON.parse(body).Country)
                console.log('Language: ' + JSON.parse(body).Language)
                console.log('Plot: ' + JSON.parse(body).Plot)
                console.log('Actors: ' + JSON.parse(body).Actors)
            }
        })
    }
}

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        var newArr = data;
        var newArray = [];

        newArray = newArr.split(',');        

        search = newArray[1];

        if (newArray[0] === 'my-tweets') {
            twitterTwitter();
        } if (newArray[0] === 'spotify-this-song') {
            spotifySpotify();
        } if (newArray[0] === 'movie-this') {
            omdbOMDB();
        }
    });
}


