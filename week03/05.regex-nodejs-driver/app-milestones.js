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
    const projection = projectionDocument(ops);

    let cursor = db.collection('companies').find(query);
    cursor.project(projection);

    let numMatches = 0;

    cursor.forEach(
        function(doc) {
            numMatches = numMatches + 1;
            console.log( doc );
        },
        function(err) {
            assert.equal(err, null);
            console.log("Our query was:" + JSON.stringify(query));
            console.log("Matching documents: " + numMatches);
            return client.close();
        }
    );
});

function queryDocument(options) {
    console.log(options);

    let query = {};

    if ("overview" in options) {
        // $options => i => case insensitive
        query.overview = {"$regex":options.overview, "$options": "i"};
    }

    if ("milestone" in options) {
        query["milestones.source_description"] = {"$regex": options.milestone, "$options": "i"};
    }

    return query;
};

function projectionDocument(options) {
    let projection = {
        "_id": 0,
        "name": 1,
        "founded_year": 1
    }

    if ("overview" in options) {
        project.overview = 1;
    }

    if ("milestone" in options) {
        projection["milestones.source_description"] = 1;
    }

    return projection;
}

// CLI functions
function commandLineOptions() {
    let optionDefinitions = [
        { name: "overview", alias: "o", type: String },
        { name: "milestone", alias: "m", type: String }
    ];

    let options = commandLineArgs(optionDefinitions);

    return options;
}

function getUsage() {
    const sections = [
        {
            header: 'Usage',
            content: 'You must apply at least one option. See below.'
        },
        {
            header: 'Options',
            optionList: [
                {
                    name: "overview",
                    alias: "o",
                    typeLabel: '{underline string}'
                },
                {
                    name: "milestone",
                    alias: "m",
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

    if (Object.keys(options).length < 1) {
        console.log(getUsage());
        process.exit();
    }

    return options;
}
