# Logical operators

## Logical AND
Select all document movies where `tomato.meter` is greater than 95 and `metacritic` is greater than 88.

```
> db.movieDetails.find({ $and: [ { "tomato.meter": { $gt: 95 } }, { "metacritic": { $gt: 88 } } ] }, { title: 1, _id: 0, "metacritic": 1, "tomato.meter": 1}).pretty()
```

Using the `$and` operator here is superfluos because we can do the same without any operator:

```
> db.movieDetails.find({ "tomato.meter": { $gt: 95 }, "metacritic": { $gt: 88 } }, { title: 1, _id: 0, "metacritic": 1, "tomato.meter": 1}).pretty()
```

* The AND operator allows to specify multiple constrains in on the same fields 

```
> db.movieDetails.find({ $and : [ { "metacritic": { $ne: null } }, { "metacritic": { $exists: true } } ] })
```

## Logical OR
Select all document movies where `tomato.meter` is greater than 95 or `metacritic` is greater than 88.

```
> db.movieDetails.find({ $or: [ { "tomato.meter": { $gt: 95 } }, { "metacritic": { $gt: 88 } } ] }, { title: 1, _id: 0, "metacritic": 1, "tomato.meter": 1}).pretty()
```

## Example

Show all movies where `rated` is an acceptable parameter (all with exception of null, "NOT RATED", "UNRATED" ) and genres of animation and comedy.

```
> db.movieDetails.find({ 
        $and : [ 
            { "rated": { $ne: null } }, 
            { "rated": { $ne: "NOT RATED" } }, 
            { "rated": { $ne: "UNRATED" } } 
        ], 
        genres: { $in: ["Animation", "Comedy"] } 
    }, 
    {
        title:1, _id: 0, rated: 1
    }
).pretty()
```
