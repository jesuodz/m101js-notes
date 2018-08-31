# Sort, Skip and Limit in the Node.js Driver

Databases are generally designed to support some kind of paginantion mechanism, in a similar way a search engine does.

1. It's important to be able to specify a sort of the results (by year, price, etc..).
2. Limit the amount of results which are got from every request. 

## Sorting

`.sort` is a function that should be applied to a cursor object. `1` means the data should be sorted in ascendent manner while `-1` means it should be sorted descendent.

### Syntax

* Sort the companies from newest to oldest ones (one sort)
```
cursor.sort({"founded_year":1});
```

* Sort companies from newest and smallest to older and largest (multiple sort)
```
cursor.sort([["founded_year",1], ["number_of_employees",-1]]);
```

Why that syntax? Due to the nature of javascript sorting objects (can't be possible to sort as they are programmed), Arrays are used because they keep their sort order.

## Skipping

Skip the results of a query by _n_ numbers of documents.
```
cursor.skip(10)
```

## Limit

Limit the results of a query by _n_ numbers of documents.
```
cursor.limit(10)
```