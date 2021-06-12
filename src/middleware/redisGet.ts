import { Request, Response, NextFunction } from "express";
import { redisClient } from "../server";

const redisGet = (req: Request, res: Response, next: NextFunction) => {
  const query_url = req.params.url;

  redisClient.get(query_url, (err: Error | null, data: String | null) => {
    if (err) throw err;

    if (data !== null) {
      return res.status(200).json({ data: { s_url: query_url, url: data } });
    } else {
      return next();
    }
  });
};

export default redisGet;
