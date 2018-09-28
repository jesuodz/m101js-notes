# Modeling a blog in Documents

Following the same previous example, we have a blog with few comments and some authors. This could be the best model for the database.

## Posts model
Comments are documents embedded in the post document; tags follow a simmilar structure.

```

{
  _id: "",
  title: "",
  author: "",
  content: "",
  comments: [
    {
      author: "",
      content: "",
      date: Date()
    }
  ],
  tags: [
    "",
    ""
  ],
  date: Date()
}
```

##  Author model

```
{
  _id: "",
  name: "",
  email: "",
  password: ""
}
```