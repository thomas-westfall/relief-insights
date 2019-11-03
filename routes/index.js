var express = require('express');
var router = express.Router();
let formatInput = require('../helpers/formatInput');
let getTweets = require('../helpers/getTweets');
let justGetTweets = require('../helpers/justGetTweets');
let toneAnalyzer = require('../helpers/toneAnalyzer');
const nodeFetch = require('node-fetch');
const phq = require('predicthq');
// Initialises PredictHQ client library using your access token
// Note: You can find/create your access token at https://control.predicthq.com/clients
const client = new phq.Client({access_token: '6E8PdOFLhC-HygFSkshRJSQel_LgSTMCDfUXGGix', fetch: nodeFetch});

// Use the events endpoint
const phqEvents = client.events;

const logEventsToConsole = events => {
    for (const event of events) {
        // See https://developer.predicthq.com/resources/events/#fields for list of all event fields.
        console.log(event);
        console.log();
    }
};

// 10km range around the -36.844480,174.768368 geopoint
const withinParam = '10km@-36.844480,174.768368';


router.post('/d', function (req,res,next){

phqEvents.search({within: withinParam})
    //.then(logEventsToConsole)
    .then((events) => res.send(events))
    .catch(err => console.error(err));

// OR if you know the place ID - example below search for events within the New York state (ID: 5128638)
// Sort by start date in descending order
// phqEvents.search({'place.scope': '5128638', 'sort': '-start'})
//     .then(logEventsToConsole)
//     .then(res.send(200))
//     .catch(err => console.error(err));
});

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