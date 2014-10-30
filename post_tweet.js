// requires node.js, twit, jquery and json

// do this periodically
setInterval(function () {
  'use strict';

  // set up the twitter auth
  var Twit = require('twit');
  var T = new Twit({
    consumer_key: 'VC5JsVXtVRYuW2iKSCdBdQ'
  , consumer_secret: 'KaopBi8BNp0V5mKzJzbW2iISR6TxSa5tIpijAnbEHc'
  , access_token: '2328747456-thj7As6jjoYE3XL38M012oRyvTTufHthr308Bx5'
  , access_token_secret: '2MSMUHZNZ5guxOZeiOoONWRK2XScO2hx7BbwCxQ51AHiI'  
  })
  
  // can't remember why this seemed like a good idea
  var env = require('jsdom').env ;
  
  //read in file
  env("next_tweet.txt", function (errors, window) {
    // if you can't read it in, throw up an error
    if (errors)
      {console.log("Error: ", errors);}

    // otherwise take the text out of the file (this makes more sense if you're making a markov chain, honestly)
    var $ = require('jquery')(window);
    var data = $("body").text();

    // print out the text to the terminal
    console.log("Posting: ",data);
  
    // post it to twitter
    T.post('statuses/update', { status: data }, function(err, reply) {
      // if it goes wrong, post the error to the console!
      if(err)
      {console.log("Error:", err.message);}
    })

  });
  
  
},10000);

