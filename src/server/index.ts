import express from "express";
import fs from "fs";
import { StaticRouter } from "react-router-dom/server";
import React from "react";
import ReactDomServer from "react-dom";
import App from "../client/App";

const PORT = 8000;

const html = fs.readFileSync("build/index.html").toString();
const parts = html.split("not rendered");
const app = express();

app.use("/build", express.static("build"));
app.use((req, res) => {
  const staticContext = {};
  const reactMarkup = <StaticRouter url={req.url} context={staticContext}></StaticRouter>;

  res.status(staticContext.statusCode);
});
