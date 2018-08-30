# Homework 2.4

How many documents in our video.movieDetails collection list just the following two genres: "Comedy" and "Crime" with "Comedy" listed first.

```
> db.movieDetails.find({
    $and: [
        { genres: { $size: 2 } },
        { genres: { $all: ["Comedy", "Crime"] } }
    ]
}).count()
```

Shorter one:

```
> db.movieDetails.find({
    genres: ["Comedy", "Crime"]
}).count()
```