const twitterPackage = require('twitter');
const keys = require('./keys');

const Twitter = new twitterPackage(keys);

Twitter.post('statuses/update', {status: 'We\'re working'},  function(error, tweet, response){
  if(error){
    console.log(error);
  }
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});

