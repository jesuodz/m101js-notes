# One to many relationship

 * One to many: it's a type of relationship where is two entities and many entities, or many entities that map to one entity.

 Example:
 There is one city and many people in it. How to model this data where 8m people live in the city?. The best design would be one with minimal duplicated data and a great consistency.

- True linking:
```
{
    {
        name: 'Andrew',
        city: "NYC"
    }
}
```

```
{
    {
        _id: "NYC"
    }
} 
```

In a one to few, where "few" is a smaller number of entities than "many" (obviously), an unique collection would fit this type of relationship