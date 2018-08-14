const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    engines = require('consolidate');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: false}));

function errorHandler(error, request, response, next) {
    console.error(error.message);
    console.error(error.stack)
    response.status(500).render('error_template', {error: error});
}

app.get('/', (request, response, next) => {
    response.render('fruitPicker', {'fruits': ['apple', 'orange', 'banana', 'peach']});
});

app.post('/favorite_fruit', (request, response, next) => {
    let favorite = request.body.fruit;
    if (typeof favorite == 'undefined') {
        next(Error('Please choose a fruit!'));
    } else {
        response.send("Your favorite fruit is " + favorite);
    }
});

app.use(errorHandler);

const server = app.listen(3000, () => {
    console.log("Listening on port", server.address().port);
})