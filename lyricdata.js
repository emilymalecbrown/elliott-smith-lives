const request = require('request');
const requestpromise = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const Promise = require('bluebird');
const lyrics = [];

requestpromise('http://www.azlyrics.com/e/elliottsmith.html')
  .then(html => {
    let $ = cheerio.load(html);
    let songUrls = [];
    let songs = $('#listAlbum > a');

    for (let song in songs) {
      if (songs[song].attribs && songs[song].attribs.href !== undefined) {
        songUrls.push(songs[song].attribs.href)
      }
    }
    return songUrls
  })
  .then(songUrls => {
    songUrls.forEach(songUrl => {
      songUrl = 'http://www.azlyrics.com' + songUrl.substring(2);
      request(songUrl, (error, response, html) => {

        $ = cheerio.load(html)

        if (error) {
          throw new Error(error);
        }

        lyrics.push($('.col-xs-12.col-lg-8.text-center > div:not([class])').text())
        fs.appendFile('lyrics.txt', $('.col-xs-12.col-lg-8.text-center > div:not([class])').text(), (err) => {
          if (err) throw err;
        });
      })
    })
  })
  .catch(error => console.error(error))

