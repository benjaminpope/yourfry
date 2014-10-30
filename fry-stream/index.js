(function() {
  var Twit = require('Twit'),
  config = require('./config.js');
  T = new Twit(config);


  var fry_stream = T.stream('statuses/filter', {track: ['stephen fry', 'steven fry', '@stephenfry']});

  fry_stream.on('tweet', function(tweet) {
    console.log('-----');
    console.log('User: %s', tweet.user.screen_name);
    console.log('Tweet: %s', tweet.text);
    console.log("");
    console.log("");
  });

  /*
  fry_stream.on('tweet', function(tweet) {
    T.post('statuses/update', {
      status: 'We recieved a tweet that said Stephen Fry!'
    });
  });
  */

 fry_stream.on('tweet', function(tweet) {
  var fs = require('fs');
  fs.writeFile('./tweets/' + new Date().getTime() + '.json', JSON.stringify(tweet));
 });
})();
