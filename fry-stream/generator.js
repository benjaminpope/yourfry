module.exports = (function() {


var tweets = [

"shallow since the high pastures or stand easily with a fizz and crackle of static. The doorbell rang again.",
"Oh shitey-shitey-shit-shit.",
"of this kind ought to have to confess this, moronic, puerile and cheap resonance of reality. So I did.",
"which Rowan handed to Adrian to forget his lines. We will bring you something.' 'Good-o,' said Adrian.",
"remember the first night of the lips, the angle of the people in the grip of what was the first floor.",
"utter despair."

];

  return {
    tweet: function() {
      return tweets[Math.floor(Math.random() * tweets.length)];
    }
  };
})();
