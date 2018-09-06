# Living without constraints

* _Foreign key constraints_: is a column that is used to join a table to other tables to ensure referential integrity of the data.

Example:
```
{
    _id: 1,
    title:..,
    body:..,
    author:..,
    date:..
}
```

```
{
    _id: 3,
    post_id: 1,
    author:..,
    author_email: ..,
    order: 0
}
```

Inside these collections, the post `_id` and `post_id` are FKC.

In Mongo, there are no foreign key constraints as presented in Relational databases. They are not created "automatically" in Mongo, they're up to the programmer.

Embedding data is the mongo-way to solve this problems.

```
{
    _id: 1,
    title:..,
    body:..,
    author:..,
    "comments" : [
        {
            "body": "...",
            "email": "mail@email.com",
            "author": "mail?"
        }
    ],
    "date": ISODate(),
    "permalink": "h",
    "tags" : [
        "Mongodb",
        "Node.js"
    ],
    "title":"title"
}
```

This is know as "pre-join" because the data is tied together to a single id in a same document.