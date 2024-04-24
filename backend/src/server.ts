import express from "express";
import "dotenv/config";
import accountRoute from "./routes/accountRoute";
import { db } from './models/database/mongodbConfig';

db.initDatabaseConnection();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (_ , res) => {
  res.send("Connected to the server");
  console.log("% Working %");
});

app.get("/reset", (_, res) => {
  try {
    db.dropDatabase();
    res.status(200).send("Database dropped successfully");
  } catch (error) {
    console.log("Error in dropping database: ", error);
    res.status(500).send("Error in dropping database");
  }
})

/*
Post - Create
Put - Update
Patch - Update
Delete - Delete
Get - Read
*/

const apiRoutes = {
  "/account" : accountRoute,
};

for (const key of Object.keys(apiRoutes)) {
  app.use(key, apiRoutes[key as keyof typeof apiRoutes]);
}

app.listen(port, ()=> {
  console.log(`Server is running on port:${port}`)
});