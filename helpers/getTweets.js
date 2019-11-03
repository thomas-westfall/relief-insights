let Twitter = require('twitter');
let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const fetchTweets = (hashTag) => {
    return new Promise((resolve, reject) => {
        client.get('search/tweets', {
            q: hashTag[0], //use the first hashtag
            tweet_mode: "extended", // very important for getting the full length of tweets instead of just truncated tweets
            lang: "en",
            count: 40
        }, (error, tweets, response) => {

            let tweetsArr = [];
            for (let i = 0; i < tweets.statuses.length; i++) {
                if(tweets.statuses[i].retweeted_status) {
                    tweetsArr.push(tweets.statuses[i].retweeted_status.full_text); //for retweeted tweets
                }
                if(tweets.statuses[i].quoted_status) {
                    tweetsArr.push(tweets.statuses[i].quoted_status.full_text); //for quoted tweets
                }
            }

            let jsonTweets = {
                text: ''
            };

            jsonTweets.text = tweetsArr.join('\n');

            resolve(jsonTweets);

            if(error) {
                reject(Error(error));
            }
        });
    });
};


module.exports = fetchTweets;