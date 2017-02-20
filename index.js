const twitterPackage = require('twitter');
const keys = require('./keys');
const findLyrics = require('./markov').generator;
const initial = require('./markov').initialResult;
const herokuKeys = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_KEY,
  access_token_secret: process.env.ACCESS_SECRET
}

const Twitter = process.env.NODE_ENV === 'production' ? new twitterPackage(herokuKeys) : new twitterPackage(keys);

Twitter.post('statuses/update', {status: findLyrics(initial)},  function(error, tweet, response){
  if(error){
    console.log(error);
  }
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});

