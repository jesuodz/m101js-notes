# Living without transactions

In the relational world, transactions offer:

* **A** (Atomicity): indivisible and irreducible series of database operations such that either all occur, or nothing occurs.
* **C** (Consistency): refers to the requirement that any given database transaction must change affected data only in allowed ways (constraints, cascades, triggers..).
* **I** (Isolation): determines how transaction integrity is visible to other users and systems. 
* **D** (Durability): Transactions that have committed will survive permanently. 

Although in Mongo there are no transactions, it supports atomic operations, and they accomplish almost the same thing as transactions.

Techiques to overcome lack of transactions:
1. **Reestructure** your code so that you are working in a single document.
2. **Implement a critical section** where you can build tests and modify.
3. **Tolerate** a bit of incosistency.