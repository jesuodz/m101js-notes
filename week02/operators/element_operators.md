# Logical operators

Mongo allows to detect the presence or absence of a given field or data type.

## Does it exists?

```
> db.movieDetails.find({"tomato.meter": { $exists: true }}).pretty()
```

## Looking for field's type

```
> db.moviesScratch.find({ "_id": { $type: "string" } } ).count()
```