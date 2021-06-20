const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb://localhost:27017";

// Database Name
const dbName = 'fruitsDB'

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db(dbName).command({ ping: 1 });
    console.log("Connected successfully to server");

    findMultipleListings(client, "fruits");

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function createMultipleListings(client, newListings){
    const result = await client.db(dbName).collection("fruits").insertMany(newListings);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

async function findMultipleListings(client, nameOfListing){
  const cursor = await client.db(dbName).collection("fruits").find();
  const results = await cursor.toArray();
  if (results.length > 0) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}
