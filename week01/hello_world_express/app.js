const express = require('express'),
    app = express();

// Express sets type-content to HTML for us :)
app.get('/', (request, response) => {
    response.send('Hello World!');
})

app.use('/', (request, response) => {
    response.sendStatus(404);
})

const server = app.listen(3000, () => {
    const port = server.address().port;
    console.log('Express server listening on port %s', port);
})