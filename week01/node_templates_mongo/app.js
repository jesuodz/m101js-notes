const express = require('express'),
    app = express()
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const url = 'mongodb://localhost:27017/',
    dbName = 'video';

// Set engine
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect(url, (error, client) => {
    assert.equal(null, error);
    console.log("Successfully connected to server.");

    const db = client.db(dbName);
    app.get('/', (request, response) => {    
        db.collection('movies').find({}).toArray( (error, docs) => {
            response.render('movies', {'movies':docs});
        })
    });

    app.use((request, response) => {
        response.sendStatus(404);
    });

    const server = app.listen(3000, (request, response) => {
        console.log("Listening on port %s", server.address().port);
    })
});
