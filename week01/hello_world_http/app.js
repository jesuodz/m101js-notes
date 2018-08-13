const http = require('http');

function returnQueryStr(url) {
    return "/" === url ? "/" : url
}

const server = http.createServer((request, response) => {
    // Set response type as HTML
    response.writeHead(200, {"Content-Type": "text/plain"}); 
    response.write("Hello world!");

    // Display url queries
    response.write("You are in " + returnQueryStr(request.url) );

    // End connection
    response.end();
});

server.listen(4400);
console.log("Server running at: http://localhost:4400");