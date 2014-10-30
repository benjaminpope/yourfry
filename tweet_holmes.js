setInterval(function () {
  'use strict';
var Twit = require('twit');

var T = new Twit({
    consumer_key: 'VC5JsVXtVRYuW2iKSCdBdQ'
  , consumer_secret: 'KaopBi8BNp0V5mKzJzbW2iISR6TxSa5tIpijAnbEHc'
  , access_token: '2328747456-thj7As6jjoYE3XL38M012oRyvTTufHthr308Bx5'
  , access_token_secret: '2MSMUHZNZ5guxOZeiOoONWRK2XScO2hx7BbwCxQ51AHiI'

})

  var env = require('jsdom').env ;

//read in file
  env("pg1661.txt", function (errors, window) {
	if (errors)
		{console.log(errors);}
	var $ = require('jquery')(window);

	//get data out of text file and put into array
	var data = $("body").text();

	//get rid of newlines, double spaces and quote marks
	data = data.replace(/\r\n/g,' ');
	data = data.replace(/  /g,' ');
	data = data.replace(/\"/g,'');
	var words = data.split(" ");

	//begin with two random consecutive words, the first of which is capitalised
	var capital = 0;
	var give_up = 0;
	while (!capital)
	{		
		var index = Math.floor(Math.random()*words.length);
		// check that the first letter is capitalised
		if (words[index][0] == words[index][0].toUpperCase() && words[index].indexOf("\"") == -1)
		{
			capital = 1;
		}	
		give_up +=1;
		if (give_up > 200)
		{
			break;
		}
	}

	var answer = [words[index], words[index+1]];

	var checkindices = [index, index+1];

	var lenout = 2;

	give_up = 0;

	// measure length of answer
	var length_of_answer = 0;
	for (var l = 0; l < answer.length; l++)
	{
		length_of_answer += answer[l].length;		
	}
	// add spaces to length count
	length_of_answer += answer.length-1;

	while (length_of_answer < 130)
	{
		// from the previous two words, find all instances of the first one within the text>
		var indices = new Array();
		for (var i = 0; i < words.length; i++)
		{
			// check that the first word matches >
			if (words[i] == answer[lenout-2])
			{
				// check that the second word matches
				if (words[i+1] == answer[lenout-1])
				{
					indices.push(i+2);	
				}
			}

		}

		// pick next word at random from pool of words
		var newindex = Math.floor(Math.random()*indices.length);
		var next_word = words[indices[newindex]];
		answer[lenout] = next_word;

		// also save the index
		checkindices.push(indices[newindex]);
		lenout +=1;
		if (next_word)
		{
		length_of_answer += next_word.length + 1;
		}
		give_up +=1;
		if (give_up >200)
		{
			break;
		}
	}
	
	var lastword = answer.slice(-1); 
	var lastcharacter = lastword[0].slice(-1);
	var appendedcharacter = '';
	// End with punctuation
	if (lastcharacter != '.' || lastcharacter != '?' || lastcharacter != '!')
	{
		appendedcharacter = '.';
	}
	answer = (answer.join(" ")+appendedcharacter);
    console.log(answer);

T.post('statuses/update', { status: answer }, function(err, reply) {
  //  ...
    if(err) return handleError(err)
})

  });

},3000000);

