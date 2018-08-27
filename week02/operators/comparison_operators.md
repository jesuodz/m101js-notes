# comparison operators

They match something on the basis of a field's value relative to another value.

* Query movieDetails with runtime greater than 90 minutes, and show only title and runtime of the movies
```
> db.movieDetails.find({ runtime: { $gt: 90 }}, {title: 1, runtime: 1, _id: 0}).pretty()
```

What about movies with a runtime greater than or equal to `X` but less or equal to than `Y`?
```
> db.movieDetails.find({ runtime: { $gte: 90, $lte: 120 }}, {title: 1, runtime: 1, _id: 0}).pretty()
```

## There're no limits when working with fields

Suppose we're looking for movies highly rated but also very long.

```
> db.movieDetails.find({ "tomato.meter": { $gte: 90 }, runtime: {$gte: 180 }}, {title: 1, runtime: 1, _id: 0}).pretty()
```

## Other examples

* Select all documents where `rated` is eigther G, PG or PG-13.
```
> db.movieDetails.find({ rated: { $in: ["G", "PG", "PG-13" ] } }, {title:1, _id: 0, rated: 1}).pretty()
```

* Select all documents where `genres` *is not* animation nor comedy and `rated` *is not equal to* R.
```
> db.movieDetails.find({ rated: { $ne: "R" }, genres: { $nin: ["Animation", "Comedy"] } }, {title:1, _id: 0, rated: 1}).pretty()
```