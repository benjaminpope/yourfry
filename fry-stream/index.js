/** Run `node index.js` to run without replying for testing, 
 * `node index.js reply` to send @ replies to people
 */
(function() {
  var Twit = require('Twit'),
    config = require('./config.js'),
    T = new Twit(config),
    send_tweets = false,
    fry_generator = require('./generator.js');

  process.argv.forEach(function(val, index, arr) {
    if (val == "reply") send_tweets = true;
  });

  var fry_stream = T.stream('statuses/filter', {track: ['stephen fry', 'steven fry', '@stephenfry']});

  fry_stream.on('tweet', function(tweet) {
    console.log('-----');
    console.log('User: %s', tweet.user.screen_name);
    console.log('Tweet: %s', tweet.text);
    console.log('Tweet ID: %s', tweet.id);
    console.log("");
    console.log("");
  });

 fry_stream.on('tweet', function(tweet) {
   var reply = '@' + tweet.user.screen_name + ' ' + fry_generator.tweet();
   console.log("Sending reply: %s", reply);
   if (send_tweets) {
     //var reply = '@' + tweet.user.screen_name + ' ' fry_generator.tweet();
     //console.log("Sending reply: %s", reply);
     T.post('statuses/update', {
       status: '@' + tweet.user.screen_name + ' ' + fry_generator.tweet(),
       in_reply_to_status_id: tweet.id
     }, function() {});
   }
 });

 fry_stream.on('tweet', function(tweet) {
  var fs = require('fs');
  console.log("WRiting tweet data to file");
  fs.writeFile('./tweets/' + new Date().getTime() + '.json', JSON.stringify(tweet));
 });
})();
