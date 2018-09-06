# What are the goals of normalization?

Consider a relational table like:

| post_id | title         | body        | author   | author_email      |
|---------|---------------|-------------|----------|-------------------|
| 1       | "Elvis lives" | "yeah..."   | "Andrew" | "andrew@mail.com" |
| 2       | "Mongo Rocks" | "This is.." | "Mac"    | "mac@mail.com"    |
| 3       | "Hello world" | "Mi.."      | "Andrew" | "andrew@mail.com" |

This is a denormalized table structure because it's not in the third normal form. If for some reason we want to update an email like `andrew@mail.com` in the first row, we will also update other emails, or update one row but not the other which would cause inconsistencies. 

* Free the database of modification anomalies
* Minimize redesign during extending
* Avoid bias towards any particular access pattern