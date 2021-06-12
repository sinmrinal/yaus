import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import redis from "redis";

import redirector from "./routes/redirector";
import create_new from "./routes/create_new";

const expressServer = express();
const redisClient = redis.createClient();

expressServer.use(cors());
process.env.NODE_ENV !== "prod" && expressServer.use(morgan("dev"));
expressServer.use(bodyParser.json());
expressServer.use(bodyParser.urlencoded({ extended: true }));

expressServer.use(redirector);
expressServer.use(create_new);



export { expressServer };
export { redisClient };

