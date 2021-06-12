import { nanoid } from "nanoid";
import { Pool } from "pg";
import { RedisClient } from "redis";

let yaus: Pool;
let client: RedisClient

export default class YAUS {
  static async injectDB(pool: Pool, redisClient: RedisClient) {
    if (yaus) return;
    try {
      yaus = pool;
      client = redisClient;
    } catch (error) {
      console.error("Enable to establish a connection via client.");
      console.error(error.stack);
      process.exit(1);
    }
  }

  static async checkSURL(s_url: string) {
    try {
      const result = await yaus.query(
        "SELECT s_url FROM yaus WHERE s_url = $1",
        [s_url]
      );
      return result.rows.length;
    } catch (error) {
      console.error(error.stack);
      return;
    }
  }

  static async add(s_url: string | undefined, url: string) {
    try {
      if (s_url)
        if ((await YAUS.checkSURL(s_url)) != 0)
          return { error: "URL already exsits." };
      if (!s_url) s_url = nanoid(7);
      const result = await yaus.query("INSERT INTO yaus VALUES ($1, $2)", [
        s_url,
        url,
      ]);
      if (result.rowCount == 1) return { url: `/${s_url}` };
      return { error: "Unable to create URL at the moment." };
    } catch (error) {
      console.error(error.stack);
      return { error: error.message };
    }
  }

  static async get(s_url: string) {
    try {
      const result = await yaus.query(
        "SELECT s_url, url FROM yaus WHERE s_url = $1",
        [s_url]
      );
      if (result.rowCount == 0) return;
      else {
        client.setnx(result.rows[0]['s_url'], result.rows[0]['url'])
        return result.rows[0];
      }
    } catch (error) {
      console.error(error.stack);
      return;
    }
  }
}
