require('dotenv').config();
const express = require('express');
const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Connected to MongoDB!");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);


// Bodyparser Middleware
app.use(express.json());

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});