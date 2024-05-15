const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    res.send("Cox's Perl is Running")
})


app.listen(port, async () => {
    console.log("express server is running on:", port)
})