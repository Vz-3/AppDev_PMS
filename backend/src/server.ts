import express from "express";

const app = express();
const port = 7777; // React uses 3000

app.get("/", (_ , res) => {
  res.send("https://www.youtube.com/watch?v=FcxjCPeicvU");
});