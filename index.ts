import express from "express";
import morgan from "morgan";

import redirector from "./routes/redirector";
import create_new from "./routes/create_new";

const server = express();

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
server.use(morgan('short'));
server.use(redirector)
server.use(create_new)

server.listen(process.env.PORT ?? 8000, () => {
  console.log(`Listining on port ${process.env.PORT ?? 8000}...`);
});
