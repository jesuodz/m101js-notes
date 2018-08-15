# Creating documents

## To insert a document with a custom `_id`:

```
db.<collection>.insertOne({
    "data" : "data",
    "_id": "customId"
})
```

* `_id` should be all of the same form in the same document. E.g: Can't mix `ObjectId()` with custom ones.
* All ids should be unique.

## To insert many documents in one sentence

```
db.moviesScratch.insertMany([
    {
        "title":"The little Mermaid",
        "year":"2018",
        "_id":"tt5493944"
    },
    {
        "title":"Crazy Rich Asians",
        "year":"2018",
        "_id":"tt3104988"
    },
    {
        "title":"Mile 22",
        "year":"2018",
        "_id":"tt4560436"
    }
]);
```

This is prone to errors. For example, inserting documents with the same ids can result in a `duplicate key error`.

```
db.moviesScratch.insertMany([
    {
        "title":"The little Mermaid",
        "year":"2018",
        "_id":"tt5493944"
    },
    {
        "title":"Crazy Rich Asians",
        "year":"2018",
        "_id":"tt3104988"
    },
    {
        "title":"Mile 22",
        "year":"2018",
        "_id":"tt4560436"
    },
    {
        "title": "After Earth",
        "year": 2013,
        "_id": "tt1815862"
    }
], {
    "ordered" : false
});
```

With `{"ordered":false}` Mongo will try to insert documents in an unordered format.