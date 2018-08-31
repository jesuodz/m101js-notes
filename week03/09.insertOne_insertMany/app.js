const MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    twitter = require('twitter');

require('dotenv').load();
const twitterClient = new twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const url = 'mongodb://localhost:27017/',
    dbName = 'social';

MongoClient.connect(url, (error, client) => {
    assert.equal(null, error);
    console.log("Successfully connected to MongoDB.");

    const db = client.db(dbName);
    const screenNames = ["Marvel", "DCComics", "TheRealStanLee"];
    var done = 0;

    screenNames.forEach( (name) => {
        var cursor = db.collection("statuses").find({"user.screen_name" : name});
        cursor.sort({"id": -1});
        cursor.limit(1);

        cursor.toArray( (error, docs) => {
            assert.equal(error, null);

            var params;
            if (docs.length == 1) {
                params = { "screen_name": name, "since_id": docs[0].id, "count": 10};
            } else {
                params = { "screen_name": name, "count": 10 };
            }

            twitterClient('statuses/user_timeline', params, (error, response) => {
                assert.equal(error, null);

                db.collection("statuses").insertMany(statuses, (error, response) => {
                    console.log(response);

                    done += 1;
                    if (donde == screenNames.length) {
                        client.close();
                    }
                });
            });
        });
    });
});