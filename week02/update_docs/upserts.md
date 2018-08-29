# Upserts

They're operations for which if any document is not found (matching a filter) they are created then.

## Example

Imagine this 
```
var detail = {
  "title": "The Martian",
  "year": 2015,
  "rated": "PG-13",
  "released": ISODate("2015-10-02T04:00:00Z"),
  "runtime": 144,
  "countries": [
    "USA",
    "UK"
  ],
  "genres": [
    "Adventure",
    "Drama",
    "Sci-Fi"
  ],
  "director": "Ridley Scott",
  "writers": [
    "Drew Goddard",
    "Andy Weir"
  ],
  "actors": [
    "Matt Damon",
    "Jessica Chastain",
    "Kristen Wiig",
    "Jeff Daniels"
  ],
  "plot": "During a manned mission to Mars, Astronaut Mark Watney is presumed" +
  " dead after a fierce storm and left behind by his crew. But Watney has" +
  " survived and finds himself stranded and alone on the hostile planet." +
  " With only meager supplies, he must draw upon his ingenuity, wit and " +
  "spirit to subsist and find a way to signal to Earth that he is alive.",
  "poster": "http://ia.media-imdb.com/images/M/" +
  "MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg",
  "imdb": {
    "id": "tt3659388",
    "rating": 8.2,
    "votes": 187881
  },
  "tomato": {
    "meter": 93,
    "image": "certified",
    "rating": 7.9,
    "reviews": 280,
    "fresh": 261,
    "consensus": "Smart, thrilling, and surprisingly funny, The Martian offers" +
    " a faithful adaptation of the bestselling book that brings out the best " +
    "in leading man Matt Damon and director Ridley Scott.",
    "userMeter": 92,
    "userRating": 4.3,
    "userReviews": 104999
  },
  "metacritic": 80,
  "awards": {
    "wins": 8,
    "nominations": 14,
    "text": "Nominated for 3 Golden Globes. Another 8 wins & 14 nominations."
  },
  "type": "movie"
};
```

* What `upsert` says here is if this filter doesn't match any document in the collection, insert it. If the document already exists (the filter matches), this update will insert a new document but with a different `_id`.
```
db.movieDetails.updateOne({
  "imdb.id": detail.imdb.id
}, {
  $set: detail
}, {
  upsert: true
});
```


