const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Set connection to mongo
const url = 'mongodb://localhost:27017/',
    dbName = 'crunchbase';

MongoClient.connect(url, (error, client) => {
    assert.equal(error, null);
    console.log("Successfully connected to MongoDB.");

    const db = client.db(dbName);
    let query = {"category_code" : "biotech"};
    // Ask for a cursor object
    let cursor = db.collection('companies').find(query);
    
    // With every .forEach() call we retrieve a new batch
    cursor.forEach(
        (doc) => {
            console.log( doc.name + " is a " + doc.category_code + " company.");
        },
        (error) => {
            assert.equal(error, null);
            return client.close();
        }
    );
});