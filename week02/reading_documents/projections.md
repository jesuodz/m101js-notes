# What are projections?

By default, MongoDB returns all fields in all matching documents for queries. Projections limit the fields returned in results documents.

* Reduce network overhead
* Reduce amount of processing.

## Syntax

Projections are defined as a second argument in the `find()` command.

```
> db.movieDetails.find({ rated: "PG" }, { title: 1 }).pretty()
```
Returns `title` of movies with a rate of PG only.

* By nature, projections exclude all other fields except `_id`, but you can exclude it, and also include another fields:
```
db.movieDetails.find({ rated: "PG" }, { _id: 0, title: 1, runtime: 1, genres: 1}).pretty()
```
* To do the opposite, aka, return all fields except certain ones:
```
db.movieDetails.find({ rated: "PG" }, { _id: 0, title: 0, runtime: 0, genres: 0}).pretty()
```