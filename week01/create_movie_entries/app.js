const express = require('express'),
    app = express()
    engines = require('consolidate'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Set connection to mongo
const url = 'mongodb://localhost:27017/',
    dbName = 'video';

// Set engine
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: false}));

function errorHandler(error, request, response, next) {
    console.error(error.message);
    console.error(error.stack)
    response.status(500).render('error_template', {error: error});
}

function checkProperties(obj) {
    for (let key in obj) {
        if (obj[key] === "") {
            return true;
        }
    }
    return false;
}

const data = {
    'page_title' : 'Add a movie!',
    'movie_data': {
        'title': "Movie title",
        'year': "Year of release",
        'imdb': "Movie's imdb"
    }
}

MongoClient.connect(url, (error, client) => {
    assert.equal(null, error);
    console.log("Successfully connected to server.");

    const db = client.db(dbName);
    app.get('/', (request, response, next) => {    
        response.render('movies', data);
    });

    app.post('/add_movie', (request, response, next) => {
        let movieTitle = request.body.movie_title;
        let releaseYear = request.body.release_year;
        let imdb = request.body.imdb;

        const doc = {
            title: movieTitle,
            year: releaseYear,
            imdb: imdb
        }

        if (checkProperties(doc)) {
            next(Error('Please send your data correctly!'));
        } else {
            db.collection('movies').insertOne(doc);
            response.send("You inserted this document: " + JSON.stringify(doc));
        }
    });

    app.use(errorHandler);

    const server = app.listen(3000, (request, response) => {
        console.log("Listening on port %s", server.address().port);
    })
});
