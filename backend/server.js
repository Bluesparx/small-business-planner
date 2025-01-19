const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config()
const connectDb =require("./config/connectionDb")
const cors = require('cors');

// Set the port to listen on
const PORT = process.env.PORT || 3000;
connectDb()

app.use(express.json())

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

//user Routes
app.use("/",require("./routes/user"))

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
