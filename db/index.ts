import { Pool } from 'pg';
import { nanoid } from 'nanoid';
const pool = new Pool({
  max: 10,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 10000
})

const preStart = async () => {
  try {
    await pool.query("CREATE TABLE IF NOT EXISTS yaus ( \
      s_url varchar PRIMARY KEY, \
      url varchar \
      );")
  } catch (error) {
    console.log(error)
  }
}
preStart()

const checkSURL = async (s_url: string) => {
  try {
    const result = await pool.query("SELECT s_url FROM yaus WHERE s_url = $1", [s_url])
    return result.rows.length
  } catch (error) {
    return undefined
  }
}

const add = async (s_url: string | undefined, url: string) => {
  try {
    if (s_url) {
      if (checkSURL(s_url)) throw new Error("Short URL already in use.")
    } else s_url = nanoid(7)
    const result = await pool.query("INSERT INTO yaus values ($1, $2)", [s_url, url])
    return result.rows[0]
  } catch (error) {
    return error
  }
}

const get = async (s_url: string) => {
  try {
    const result = await pool.query("SELECT s_url, url FROM yaus WHERE s_url = $1", [s_url])
    if (result.rowCount == 0) throw new Error("Invalid URL")
    else return result;
  } catch (error) {
    return error;
  }
}

export { get, add }