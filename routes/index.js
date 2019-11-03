var express = require('express');
var router = express.Router();
let formatInput = require('../helpers/formatInput');
let getTweets = require('../helpers/getTweets');
let justGetTweets = require('../helpers/justGetTweets');
let toneAnalyzer = require('../helpers/toneAnalyzer');
let getDisasters = require('../helpers/getDisasters');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Tone Checker'
  });
});

router.post('/tweets', function (req,res,next){
  let hashTag = req.body.hashTag;

  let cleanedHashTag = formatInput(hashTag);

  justGetTweets(cleanedHashTag)
    .then((tweets) => res.send(tweets))
    .catch((err) => {
      console.error(err);
      reject(Error(err));
    });
})

router.post('/d', function (req,res,next){
  let hashTag = req.body.hashTag;

  let cleanedHashTag = formatInput(hashTag);

  getDisasters(cleanedHashTag)
    .then((tweets) => res.send(tweets))
    .catch((err) => {
      console.log("here");
      console.error(err);
      reject(Error(err));
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