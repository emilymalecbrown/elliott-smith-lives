const fs = require('fs');
const _ = require('lodash');
const Markov = require('markov-strings');

let lyrics = fs.readFileSync('lyrics.txt').toString();
let words = [];

lyrics = lyrics.split(/\r?\n/);

const removeDupsFromStr = (lyrics) => {
  for (let i=0; i<lyrics.length; i++) {
    let line = [];
    let lyricDict = lyrics[i].split(/\s+/).reduce(function(map, word){
      map[word] = (map[word]||0)+1;
      return map;
    }, Object.create(null));
    for (let word in lyrics[i]) {
      line.push(lyrics[i][word]);
    }
    lyrics[i] = line.join("");
  }
  return lyrics;
}

//lyrics = removeDupsFromStr(lyrics)

lyrics = _.uniq(lyrics)


// 1) Simple way
const markov = new Markov(lyrics, {minWords: 10});
markov.buildCorpusSync();
let initialResult = markov.generateSentenceSync();

//recursively generate until you get something better
const generator = (result) => {
  if (result.score > 8 && result.scorePerWord > 1 && lyrics.indexOf(result.string) === -1) {
    let string = result.string
    return string;
  } else {
    result = markov.generateSentenceSync();
    return generator(result);
  }
}

module.exports = { initialResult, generator }
