var express = require('express');
var router = express.Router();
let formatInput = require('../helpers/formatInput');
let getTweets = require('../helpers/getTweets');
let toneAnalyzer = require('../helpers/toneAnalyzer');


router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Tone Checker'
  });
});


router.post('/', function (req, res, next) {
  let hashTag = req.body.hashTag;

  let cleanedHashTag = formatInput(hashTag);

  getTweets(cleanedHashTag)
    .then((tweets) => toneAnalyzer(tweets))
    .then((tones) => res.json(tones))
    .catch((err) => {
      console.error(err);
      reject(Error(err));
    });

});

module.exports = router;