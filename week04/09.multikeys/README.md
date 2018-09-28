# Multikeys indexes

Consider two schemas:
A student's collection

```
{
   _id: 1,
   name: 'Jesus',
   teachers: [10, 2, 3]
}
```
And a teachers' collection

```
{
   _id: 10
   name: 'Tony'
}
```

## How can we find the teachers of a particular student?
Do a find query which should return the students document.

## How can we find all the students students who HAVE a particular teacher?

* Create an multikey index
```
db.students.ensureIndex({'teachers':1})
```

* Do a find query
```
db.students.find({'teachers': {$all: [0,1]}})
```
