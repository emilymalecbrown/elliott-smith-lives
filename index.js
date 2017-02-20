const twitterPackage = require('twitter');
const findLyrics = require('./markov').generator;
const initial = require('./markov').initialResult;
const keys = {
  consumer_key: process.env.CONSUMER_KEY || require('./keys').consumer_key,
  consumer_secret: process.env.CONSUMER_SECRET || require('./keys').consumer_secret,
  access_token_key: process.env.ACCESS_KEY || require('./keys').access_token_key,
  access_token_secret: process.env.ACCESS_SECRET || require('./keys').access_token_secret
}

const Twitter = new twitterPackage(keys);

Twitter.post('statuses/update', {status: findLyrics(initial)},  function(error, tweet, response){
  if(error){
    console.log(error);
  }
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});

