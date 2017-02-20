const twitterPackage = require('twitter');
const keys = require('./keys');
const findLyrics = require('./markov').generator;
const initial = require('./markov').initialResult;

const Twitter = new twitterPackage(keys);

Twitter.post('statuses/update', {status: findLyrics(initial)},  function(error, tweet, response){
  if(error){
    console.log(error);
  }
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});

