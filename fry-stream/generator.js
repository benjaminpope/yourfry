module.exports = (function() {

var tweets = ["just slide out,’ said Rudi with surprise. 'What's the matter?' 'I'm sorry, darling, I know. But suppose it would be familiar with it.", 
  "until the night before, that it was my habit I thought it the best metaphor, but you don’t identify completely with your fellow . . .",
  "Roselle, there were two entries under the table. 'Now correct me if I forget. Frustration and disappointment are the movements of men.",
  "could be wiped out by this time apply to retake my A level courses they offered a picture of some kind of you go moving,’ said Brown.",
  "therefore to be facing homewards and not enough force of my life. Not so companionable, but friendly enough. ‘Do you think,’ I yelled.",
  "printer, a plotter, a dedicated RGB monitor and an applicator. I've seen Oliver this morning.' 305 Stephen Fry boxes, staring at me.",
  "you never know and you will have come from the sweaty shelter of the young boy. ‘Hello, there,’ he said, in a bucket of hot chocolate.",
  "Oh shitey-shitey-shit-shit."];

  return {
    tweet: function() {
      return tweets[Math.floor(Math.random() * tweets.length)];
    }
  };
})();
