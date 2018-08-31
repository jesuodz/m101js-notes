const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const url = 'mongodb://localhost:27017/',
    dbName = 'crunchbase';

MongoClient.connect(url, (error, client) => {

    assert.equal(error, null);
    console.log("Successfully connected to MongoDB.");
    
    const db = client.db(dbName);

    const query = {"permalink": {"$exists": true, "$ne": null}};
    const projection = {"permalink": 1, "updated_at": 1};

    var cursor = db.collection('companies').find(query);
    cursor.project(projection);
    cursor.sort({"permalink": 1})

    var markedForRemoval = [];

    var previous = { "permalink": "", "updated_at": "" };
    cursor.forEach(
        function(doc) {

            if ( (doc.permalink == previous.permalink) && (doc.updated_at == previous.updated_at) ) {
                markedForRemoval.push(doc._id);
            }

            previous = doc;
        },
        function(error) {

            assert.equal(error, null);

            var filter = {"_id": {"$in": markedForRemoval}};

            db.collection("companies").deleteMany(filter, (error, response) => {

                console.log(response.result);
                console.log(markedForRemoval.length + " documents removed.");

                return client.close();
            });
        }
    );

});


