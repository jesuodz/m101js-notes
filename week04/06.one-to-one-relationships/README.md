# One to One relationships

- 1to1 relationships: are relations where one entity is related to exactly one other entity.

Example: an employee-resume relationship

```
{
    _id: 20,
    "name": "Andrew"
}
```

```
{
    _id: 30,
    "jobs": [],
    "education": [],
    employee_id: 20
}
```

You can embed one collection into another and how it may look depends on how you want to access to the data. Some considerations are:

1. Frequency of access: if some data will be accessed more than another, then it's better to keep them separated in order to reduce the working size.
2. Which are "growing" most of the time? some documents that are constantly updated and growing (in data) are better to keep separated.
3. Atomiticity: Some documents need to be updated at once. If they are related, they may be better inside a single collection.