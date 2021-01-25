import express from "express";
import {Client} from "pg";

const server = express();
const client = new Client("postgres://postgres:password@localhost:5000/link");

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,x-access-token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

server.listen(8001, () => {
  console.log('Listining on port 8001...');
});
