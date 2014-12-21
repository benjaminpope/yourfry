module.exports = (function() {
 return {
  tweet: function() {

   var env = require('jsdom').env ;
   //read in file
	var data;
   env({ file: "../data/total-fry.txt", 
    done: function (errors, window) {

	if (errors)
		{console.log("Error: ",errors);}

	var $ = require('jquery')(window);

	//get data out of text file and put into array
	data = $("body").text();
	}});
	
	setInterval(function () {
	if(data!=undefined){

	//get rid of newlines, double spaces and quote marks
	data = data.replace(/\n/g,' ');
	data = data.replace(/  /g,' ');
	data = data.replace(/\"/g,'');
	data = data.replace(/\)/g,'');
	data = data.replace(/\(/g,'');
	// split into individual words
	var words = data.split(" ");

	//console.log(words);
/*
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
*/


	//begin with two random consecutive words, the second of which ends in punctuation
	var end_of_sentence = 0;
	var give_up = 0;
	while (!end_of_sentence)
	{		
		var index = Math.floor(Math.random()*words.length);
		// check for punctuation
		if (words[index][words[index].length - 1] == '.')
		{
			end_of_sentence = 1;
		}	
		give_up +=1;
		if (give_up > 200)
		{
			// just go with whatever word you ended up with
			break;
		}
	}


	answer = [words[index].slice(0,words[index].length-1), words[index-1]];

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

	while (length_of_answer < 100)
	{
		// from the first two words, find all instances of the second one within the text>
		var indices = new Array();
		for (var i = 2; i < words.length; i++)
		{

			// check that the first word matches 
			if (words[i] == answer[answer.length-2])
			{
				//console.log(words[i],words[i-1],answer[answer.length-2],answer[answer.length-1])
				// check that the second word matches
				if (words[i-1] == answer[answer.length-1])
				{
					indices.push(i-2);
				}
			}
		}

		// pick next word at random from pool of words
		var newindex = Math.floor(Math.random()*indices.length);
		var next_word = words[indices[newindex]];
		//console.log(next_word,answer)
		answer.push(next_word);

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
	
/*	var lastword = answer.slice(-1); 
	var lastcharacter = lastword[0].slice(-1);
	var appendedcharacter = '';

	// End with punctuation
	if (lastcharacter != '.' || lastcharacter != '?' || lastcharacter != '!')
	{
		appendedcharacter = '.';
	}
*/
	answer = answer.reverse();
	answer = (answer.join(" ")+'.');
	return answer
	data = undefined
	}},100);
    }
  };

})();

