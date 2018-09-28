# Benefits of embedding

Embedding data from two different collections into one unique collection improves performance... Why?.

* Improved real performance
Spinning disk take around 1ms to get their first byte of data, but after then, each additional byte comes more quickly.

* One round trip to the database.
If you need several pieces of data that are stretched along many collections, you'll need many roundtrips to the database. The only problem of this benefit is, if one part of the document is changed a lot it may winds up.