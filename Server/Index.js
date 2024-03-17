import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import router from './Routes/Census.routes.js';
dotenv.config({ path: "./.env" });
import {createTable} from "./Database/db.js"
import client from './Database/db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world");
})
app.listen(5000, () => {
    console.log("server is running on port 5000");

})

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
    client.query(createTable, (err, result) => {
        if (err) {
          console.error('Error creating table', err);
        } else {
          console.log('Table created successfully');
        }
      });
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });


app.use(router)