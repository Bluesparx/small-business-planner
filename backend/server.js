import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import connectDb from './config/connectionDb.js';
import router from './routes/user.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

connectDb();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//user Routes
app.use("/", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
