# Update documents

* Updates can actually create documents

## Update one

### syntax

```
db.<collection>.find( {<document to match>, { $set: { <document updated> } }} )
```

Example: 

```
db.movieDetails.updateOne({
  title: "The Martian"
}, {
  $set: {
    poster: "https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_UX182_CR0,0,182,268_AL_.jpg"
  }
})
```

* `<document to match`: The first document matched will be the updated one.
* ` { $set: { <document updated> } } `: How would you like to update the document? Especified by an operator.
    * `$set`: Takes a document with as an argument and changes the document matched. It'd need, of course, the new document be of the exact form.

### $inc
Increase by an amount a certain field of a document.

```
> db.movieDetails.updateOne({title: "The Martian"},
                            { $inc: {"tomato.reviews": 3, "tomato.userReviews": 25} })
```

### Update or add array
This is just an example
```
> db.movieDetails.updateOne({title: "The Martian"},
                            { $push: { reviews: 
                                        { $each: [
                                            { rating: 0.5,
                                             date: ISODate("2016-01-13T07:00:01Z"),
                                             reviewer: "Jhon S.",
                                             text: "A masterpiece!" }],
                                          $position: 0,
                                          $slice: 5 } } } )
```
* `$push`: Add items to an array. If the array doesn't exist, create one.
* `$position`: Specifies at what location will the element be inserted in the array.
* `$slice`: limits the number of array elements.

In this example `reviews` is an array of reviews limited to five arrays and with elements sorted from the most recent added to oldest one.

## Update many

It works the same way as `updateOne()`, the only difference is it makes the same modification to all documents match the filter.

By convention, in Mongo any field that is null should be deleted from the document.

```
> db.movieDetails.updateMany( { rated: null }, 
                            { $unset: { rated: "" } } )
```

## Replace One

In the collection `movies`:
```
> db.movies.find({title: "The Martian"}).pretty()
{
        "_id" : ObjectId("5b86b496a3d98ea3b7fddcd5"),
        "title" : "The Martian",
        "imdb" : "tt3659388",
        "year" : 2015,
        "type" : "movie"
}
```

Now, ignoring [upsert](upserts.md), we will replace the description of this movie (document).
```
> db.movies.replaceOne(
    {"imdb": detail.imdb.id},
    detail);
```

So, what `replaceOne` does it completely replaces a document with a new one.