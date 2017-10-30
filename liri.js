// Load NPM packages // stores dependencies as variables	
var keys = require('./keys.js');

var twitter = require("twitter");

var Spotify = require("node-spotify-api");

var request = require("request");

var fs = require('fs');



// upon running 'node liri.js' this message pops up letting user know what commands to type
console.log("type my-tweets, spotify-this-song, movie-this, or do-what-it-says to get started");

// userCommand // 
var userCommand = process.argv[2];
var secondCommand = process.argv[3];

// This for loop allows for multiple words to be processed in the secondCommand variable
for (i = 4; i < process.argv.length; i++) {
    secondCommand += '+' + process.argv[i];
}


function mySwitchFunction() {
    // switch statement whichs takes in users command and reacts from there
    // console.log('start switch')
    switch (userCommand) {

        case 'my-tweets':
            getTweets();
            break;

        case 'spotify-this-song':
            mySpotify();
            break;

        case 'movie-this':
            myMovie();
            break;

        case 'do-what-it-says':
            whatISay();
            break;

    }
};

// function to retrieve information from twitter
function getTweets() {
    console.log("Here Come The Tweets!");

    // create a new variable for instance of twitter - passes 'keys' global variable which references the keys.js file
    var client = new twitter(keys)


    //parameters for twitter function - pulls 20 tweets from my twitter account
    var parameters = {
        screen_name: 'mwpeltzer',
        count: 20
    };
    // pulls tweets from my twitter - for loop numbers the tweets 1-19 // also lists creation date and actual tweet content
    client.get('statuses/user_timeline', parameters, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                var returnedData = ('Number: ' + (i + 1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
                console.log(returnedData);
                console.log("------------");
            }
        };
    });

    //end of getTweets    
};


//function to retrieve song information from spotify
function mySpotify() {
    console.log("Here's The Song Info!")


    var searchTrack = '';

    var spotify = new Spotify({
        id: 'c4f36b57f5e74a6b858c77acfaf184e5',
        secret: '81b5017ea23848bd85953b8ab0f8e612'
    })
    // if the secondCommand input is not recognized, will automatically search "The Sign"
    console.log(spotify);
    if (secondCommand === undefined) {
        searchTrack = "The Sign";
    } else {
        searchTrack = secondCommand;
    }
    // searches spotify for requested song
    spotify.search({ type: 'track', query: searchTrack }, function(err, data) {
        if (err) {
            return console.log("Error Occurred: " + err);
        } else {

        	// Dot chain within the object to retrive the desired information
            // console.log(data.tracks.items[0].url);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        }
    });

    //end of mySpotify	
};

function myMovie() {
    console.log("I Love That Movie!");

    
    var searchMovie;

    if (secondCommand === undefined) {
        searchMovie = "Mr.Nobody";
    } else {
        searchMovie = secondCommand;
    };

    var url = 'http://www.omdbapi.com/?t=' + searchMovie +'40e9cece';
    request(url, function(error, response, body) {
    	if(!error && response.statusCode == 200){
    		console.log("Title: " + JSON.parse(body)["Title"]);
    	}
    })


    // end of 'myMovie'	
};



// calls the 'mySwitchFunction' function
mySwitchFunction();