# find() and Cursors in the Node.js Driver

## Import data to mongo

```
mongoimport -d <database_name> -c <collection_name> <file>
```
Where `-d` means database and `-c` collection

* When connecting from a different computer we would need to change the localhost or IP address in `const url = 'mongodb://localhost:27017/'`, otherwise you will get a `ECONNREFUSED` error.

## Cursors

* Case 1 — [app.js](app.js): after asking for a cursor object with `find(query)`, the app retrieves all the documents and convert them in an array with `.toArray(...)`. 
* Case 2 — [app-cursor.js](app-cursor.js): the app first ask for a cursor object. `cursor` is a variable with a method called `forEach()` which takes a function as parameter. [More](https://docs.mongodb.com/manual/reference/method/cursor.forEach/).

On case 2, we're streaming the documents into the application as we need them. It's a better way than case 1 in terms of efficiency, because the app only retrieves documents in batches with each `.forEach(...)` call and do the neccessary stuff. Compared with case 1, where we only can apply a `.forEach(...)` after the app retrieves and convert the documents with `.toArray(...)` method.