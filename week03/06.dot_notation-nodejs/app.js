const MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    commandLineArgs = require('command-line-args'),
    commandLineUsage = require('command-line-usage');

// Set cli
const ops = cli();

// Set connection to mongo and database name
const url = 'mongodb://localhost:27017/',
    dbName = 'crunchbase';

MongoClient.connect(url, (error, client) => {
    assert.equal(error, null);
    console.log("Successfully connected to MongoDB.");

    const db = client.db(dbName);
    const query = queryDocument(ops);
    const projection = {"_id": 0, "name": 1, "founded_year": 1,
                        "number_of_employees": 1, "crunchbase_url": 1, "ipo.valuation_amount": 1};
    let cursor = db.collection('companies').find(query);
    cursor.project(projection);
    let numMatches = 0;

    cursor.forEach(
        function(doc) {
            numMatches = numMatches + 1;
            console.log( doc );
        },
        function(error) {
            assert.equal(error, null);
            console.log("Our query was: " + JSON.stringify(query));
            console.log("Matching documents: " + numMatches);
            return client.close();
        }
    );
})

function queryDocument(options) {
    console.log(options);

    let query = {
        "founded_year": {
            "$gte": options.firstYear,
            "$lte": options.lastYear
        }
    };

    if ("employees" in options) {
        query.number_of_employees = { "$gte": options.employees }
    }

    if ("ipo" in options) {
        if (options.ipo == "yes") {
            query["ipo.valuation_amount"] = {"$exists": true, "$ne": null};
        } else if (options.ipo == "no") {
            query["ipo.valuation_amount"] = {"$ne": null};
        }
    }

    return query;
}

// CLI functions
function commandLineOptions() {
    let optionDefinitions = [
        { name: "firstYear", alias: "f", type: Number },
        { name: "lastYear", alias: "l", type: Number },
        { name: "employees", alias: "e", type: Number },
        { name: "ipo", alias: "i", type: String }
    ];

    let options = commandLineArgs(optionDefinitions);

    return options;
}

function getUsage() {
    const sections = [
        {
            header: 'Usage',
            content: 'The first two options below are required. The rest are optional'
        },
        {
            header: 'Options',
            optionList: [
                {
                    name: "firstYear",
                    alias: "f",
                    typeLabel: '{underline number}'
                },
                {
                    name: "lastYear",
                    alias: "l",
                    typeLabel: '{underline number}'
                },
                {
                    name: "employees",
                    alias: "e",
                    typeLabel: '{underline number}'
                },
                {
                    name: "ipo",
                    alias: "i",
                    typeLabel: '{underline string}'
                }
            ]
        }
    ];

    return commandLineUsage(sections);
}

// CLI
function cli() {
    const options = commandLineOptions();

    if ( !(("firstYear" in options) && ("lastYear" in options))) {
        console.log(getUsage());
        process.exit();
    }

    return options;
}
