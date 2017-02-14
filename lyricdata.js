const request = require('request');
const cheerio = require('cheerio');
const Promise = require('bluebird');
const lyrics = [];

request('http://www.azlyrics.com/e/elliottsmith.html', (error, response, html) => {

  let $ = cheerio.load(html);

  if(error){
    throw new Error(error);
  }

  let songUrls = [];
  let songs = $('#listAlbum > a');

  for (let song in songs) {
    if (songs[song].attribs && songs[song].attribs.href !== undefined) {
      songUrls.push(songs[song].attribs.href)
    }
  }

  Promise.map(songUrls, (songUrl) => {
    songUrl = 'http://www.azlyrics.com' + songUrl.substring(2);
    request(songUrl, (error, response, html) => {

      $ = cheerio.load(html)

      if (error) {
        throw new Error(error);
      }

      lyrics.push($('.col-xs-12.col-lg-8.text-center > div:not([class])').text())
    })
  })
  .then((lyrics) => {

  })

})


