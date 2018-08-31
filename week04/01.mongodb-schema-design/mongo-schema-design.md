# Mongo Schema Design

In Mongo, it's more important to keep the data in a way that's inducive to the application using the data.

* What pieces of data are used together?
* What pieces of data are read-only mostly?
* What pieces of data are written all the time?

Then we organize our data within MongoDB to specifically suit our application data access patterns.

In relational databases, you'd keep the data in a way that's agnostic to the application.

* **Rich documents**: not only tabular data, but also arrays or an entire document.
* **Pre join/Embed data**. Mongo doesn't support joins. Joins are made in the application itself.
* No constraints. 
* **Atomic operations**. Mongo doesn't support transactions. You should think on how to organize your data to support atomic operations. 
* **There's no declared schema** but you should make one ;)
