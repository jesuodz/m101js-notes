# Batching

* The first batch returns 101 documents, or just enough documents to exceed one megabyte.
* Subsecuent batches will be 4 megabytes.

`var c = db.movies.find();`

* using `it` retrieves files.

* Stores how many objects are left in batch:
```
var doc = function() { return c.hasNext() ? c.next() : null; }
```

* Return how many objects `c.objsLeftInBatch();`

doc();
