# Reading documents

* Read documents based on a query
```
db.movieDetails.find({ "tomato.meter": 100 }).pretty()
```

* Count documents based on a query

Matches all documents where `USA` is present as a country.
```
db.movieDetails.find({ "countries" : "USA" }).count()
> 963
```

## Equality matches on arrays

* On the entire array
**Order of elements matter**

Match documents where `["Ethan Coen","Joel Coen"]` are writers, in that order.
```
db.movieDetails.find({"writers": ["Ethan Coen","Joel Coen"]}).count()
> 1
```

* Based on any element

Matches all documents where `USA` is present as the SOLE country.

```
db.movieDetails.find({ "countries" : ["USA"] }).count()
> 812
```

* Based on a specific element

```
db.movieDetails.find({ "actors.0" : "Jeff Bridges" }).count()
> 2
```

Also, in the second example _Count documents based on a query_

db.movieDetails.find({ "countries.0" : "Sweden" }).count()
db.movieDetails.find({ $and:[{"genres" : "Comedy"}, {"genres": "Crime"}]}).count()