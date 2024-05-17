const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


// middlewares
app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.userPass}@coxs-pearl.c2twe8z.mongodb.net/?retryWrites=true&w=majority&appName=coxs-pearl`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const run = async () => {
    try {
        const HotelDB = client.db("HotelDB")
        const RoomCollection = HotelDB.collection("RoomCollection")

        app.get('/', async (req, res) => {
            res.send("Cox's Perl is Running")
        })

        app.get('/rooms', async (req, res) => {
            const Query = { availability: true }
            const Cursor = RoomCollection.find(Query)
            const Result = await Cursor.toArray();
            res.send(Result)
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally { }
}
run().catch(console.dir);


app.listen(port, async () => {
    console.log("express server is running on:", port)
})