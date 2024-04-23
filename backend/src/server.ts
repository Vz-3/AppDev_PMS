import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.get("/", (_ , res) => {
  res.send("Connected to the server");
  console.log("% Working %");
});

/*
Post - Create
Put - Update
Patch - Update
Delete - Delete
Get - Read
*/

app.listen(port, ()=> {
  console.log(`Server is running on port:${port}`)
});