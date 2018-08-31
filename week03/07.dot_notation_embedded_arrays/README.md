# Dot notation on Embedded Documents in Arrays

Suppose you have an array of documents like:

```
{
    ...
    "offices" : [
		{
			"description" : "Headquarters",
			"address1" : "1601 Willow Road",
			"address2" : "",
			"zip_code" : "94025",
			"city" : "Menlo Park",
			"state_code" : "CA",
			"country_code" : "USA",
			"latitude" : 37.41605,
			"longitude" : -122.151801
		},
		{
			"description" : "Europe HQ",
			"address1" : "",
			"address2" : "",
			"zip_code" : "",
			"city" : "Dublin",
			"state_code" : null,
			"country_code" : "IRL",
			"latitude" : 53.344104,
			"longitude" : -6.267494
		},
		{
			"description" : "New York",
			"address1" : "340 Madison Ave",
			"address2" : "",
			"zip_code" : "10017",
			"city" : "New York",
			"state_code" : "NY",
			"country_code" : "USA",
			"latitude" : 40.7557162,
			"longitude" : -73.9792469
		}
	]
}
```

In a way, MongoDB each one of these entries as if they were multiple copies of this exact document like `{}."offices".{}` but for each one document inside that array