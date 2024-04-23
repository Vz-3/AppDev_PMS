import express from "express";
import "dotenv/config";
import authRoute from "./routes/authRoute";

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

const apiRoutes = {
  "/account" : authRoute,
};

for (const key of Object.keys(apiRoutes)) {
  app.use(key, apiRoutes[key as keyof typeof apiRoutes]);
}

app.listen(port, ()=> {
  console.log(`Server is running on port:${port}`)
});