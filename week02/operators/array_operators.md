# Array operators

## $all

Match arrays of fields.

```
db.movieDetails.find({ genres: { $all: ["Comedy", "Crime", "Drama"] } }).pretty()
```

## $size

Match documents based on the length of an array.

```
db.movieDetails.find({ $and: [{ countries: { $size: 1 } }, { countries: "Australia" }] }, { title: 1, _id: 0 })
```

## $elemMatch

Match elemens in a given array field. See [docs](https://docs.mongodb.com/manual/reference/operator/query/elemMatch/#op._S_elemMatch)

## Dot notation

"Show me how many documents have Australia has the second country in the list of countries".

```
> db.movieDetails.find({ "countries.1": "Australia" }).count()
```