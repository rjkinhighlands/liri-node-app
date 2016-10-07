// GRAB KEYS from keys.js //

var keys = require('./keys.js');

// TWITTER KEYS //

var twitKeys = keys.twitterKeys;

// PROCESS ARGUMENT #2 //

var command = process.argv[2];

// PASS INFO on SPOTIFY or MOVIE API to ARRAY //

var pass = process.argv[3];

// TWITTER API LOAD //

var twitClient = new Twitter(twitKeys);

// SPOTIFY REQUEST //

var spotClient = require('./node_modules/spotify');

// FILE SYSTEM CLIENT //

var fs = require('fs');

// OMBA DATA //

var request = require('request');

// TWITS RECENT //

function twitGet(){
	twitClient.get('statuses/user_timeline',function(error, tweets, response){
		if(error) throw error;
		for (var i = 0; i < tweets.length; i++){
			console.log(tweets[i].created_at+": "+tweets[i].user.screen_name+ " says"+tweets[i].text);			
		}
	})
};

// SPOTIFY REQUESTED //

function spotifyGet(){
	spotClient.search({type:'track', query: pass}, function(err, data){
		if(err){
			console.log('Error occurred: '+err);
			return;			
		}
		var results = data.tracks.items;

		console.log ("Found: "+results.length+" results matching "+pass);

		for(var i = 0; i < results.length; i++){
			console.log(" ");
			console.log("Song #"+(i+1));
			console.log("Artist: "+data.tracks.items[i].artists[0].name);
			console.log("Song Name; "data.tracks.items[i].name);
			console.log("Album Name: "data.tracks.items[i].preview_url);
		}
	})
}

// MOVIE API REQUESTED //

	function movieGet(){
		request("http://www.omdbapi.com/?t="+info+"&plot=short&tomatoes=true&r=json", function(error, response, body){
			if(!error && response.statusCode == 200){

				// JSON Parsed //

				var info = JSON.parse(body);
				console.log("Title: "+info.Title);
				console.log("Release Year: "+info.Year);
				console.log("IMDB Rating: "+info.imdbRating);
				console.log("Production Country: "+info.Country);
				console.log("Language: "+info.Language);
				console.log("Actors; "+info.Actors);
				console.log("Synopsis: "+info.Plot);
				console.log("Roteen Tomatoes Rating: "+info.tomatoRating);
				console.log("Rotten Tomatoes URL: "+info.tomatoURL);
			}
		})
	}

// SPOTIFYING TEXT //

	function spotIt(){
		fs.readFile("random.txt", "utf8", function(error, data,){

		// Splits and Puts in Array //

		var dataArr = data.split(","); 
		command = dataArr[0];
		pass = dataArr[1];
		switch(command){
			case "my tweets":
			twitGet();
			break;
			case "spotify-this-song":
			spotifyGet();
			break;
			case "movie_this":
			movieGet();
			break;
		}
	})
}

// SWITCH COMMANDS //

	switch(command){
		case "my-tweets"
		twitGet();
		break;
		case "spotify-this-song":
		if(pass == undefined){
			pass = 'The Sign';
		}
		spotifyGet();
		break;
		case "movie-this":
		if(pass == undefined){
			pass = 'Mr. Nobody';
		}
		movieGet();
		break;
		case "do-what-it-says"
		spotIt();
		break;
}
















