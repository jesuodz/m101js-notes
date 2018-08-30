# Challenge problem nº2

Write an update command that will remove the "tomato.consensus" field for all documents matching the following criteria:

* The number of imdb votes is less than 10,000
* The year for the movie is between 2010 and 2013 inclusive
* The tomato.consensus field is null
How many documents required an update to eliminate a "tomato.consensus" field?

```
> db.movieDetails.updateMany({
        $and: [
            { "tomato.consensus": { $exists: true } },
            { "tomato.consensus": { $eq: null } }
        ],
        "imdb.votes": { $lt: 10000 },
        year: { $gte: 2010, $lte: 2013}
    },
    {
        $unset: { "tomato.consensus" : "" }
    }
);
```