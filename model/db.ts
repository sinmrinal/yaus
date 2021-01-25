import { Pool } from "pg";

const pool = new Pool({
  max: 10,
  connectionString: process.env.DATABASE_URL
});

pool.query(`
      CREATE TABLE IF NOT EXISTS link (
        s_url STRING PRIMARY KEY,
        url STRING
        );
`);

export default pool;