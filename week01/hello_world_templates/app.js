const express = require('express'),
    app = express()
    engines = require('consolidate');

// Set engine
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', (request, response) => {
    response.render('hello', {'name': 'you :)'});
})

app.use('/', (request, response) => {
    response.sendStatus(404);
})

const server = app.listen(3000, () => {
    const port = server.address().port;
    console.log('Express server listening on port %s', port);
})