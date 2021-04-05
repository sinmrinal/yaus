import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import redirector from "./routes/redirector";
import create_new from "./routes/create_new";

const server = express();

server.use(cors());
process.env.NODE_ENV !== "prod" && server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(redirector);
server.use(create_new);

export default server;
