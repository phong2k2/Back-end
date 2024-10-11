const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require('body-parser')
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())

routes(app);



mongoose.connect('mongodb+srv://lnbphong20it2:Phong2k2@phong.3mclw.mongodb.net/?retryWrites=true&w=majority&appName=Phong')
    .then(() => {
        console.log('Connect DB success!')
    })
    .catch((err) => {
        console.log(err)
    })


app.listen(port, () => {
    console.log('Server is running in port: ', + port)
})