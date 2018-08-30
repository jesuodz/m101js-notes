const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Set connection to mongo
const url = 'mongodb://localhost:27017/',
    dbName = 'crunchbase';

MongoClient.connect(url, (error, client) => {
    assert.equal(error, null);
    console.log("Successfully connected to MongoDB.");

    const db = client.db(dbName);
    let query = {"founded_year" : 2010};
    let projection = {"name": 1, "number_of_employees": 1, "_id": 0};

    let cursor = db.collection('companies').find(query);
    cursor.project(projection);

    cursor.forEach(
        function(doc) {
            console.log(doc.name + " has " + doc.number_of_employees + " employees.");
        },
        function(err) {
            assert.equal(err, null);
            return client.close();
        }
    );
});
