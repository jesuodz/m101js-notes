const express = require('express'),
    app = express(),
    engines = require('consolidate');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

function errorHandler(error, request, response, next) {
    console.error(error.message);
    console.error(error.stack)
    response.status(500).render('error_template', {error: error});
}

app.get('/:name', (request, response, next) => {
    let name = request.params.name;
    let getvar1 = request.query.getvar1;
    let getvar2 = request.query.getvar2;

    const data = {
        name: name,
        getvar1: getvar1,
        getvar2: getvar2
    }

    response.render('index', data);
});

// Handle errors
app.use(errorHandler);

const server = app.listen(3000, () => {
    console.log("Listening on port", server.address().port);
})