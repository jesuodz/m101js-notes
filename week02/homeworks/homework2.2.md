# homework 2.2

Using the video.movieDetails collection, which of the queries below would produce output documents that resemble the following. Check all that apply.

```
{ "title" : "P.S. I Love You" }
{ "title" : "Love Actually" }
{ "title" : "Shakespeare in Love" }
```

```
> db.movieDetails.find({}, {title: 1, _id:0})
...
> db.movieDetails.find({year: 1964}, {title: 1, _id:0})
...
```