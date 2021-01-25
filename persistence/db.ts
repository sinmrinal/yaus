import { Pool } from "pg";

const pool = new Pool({
  max: 10,
  connectionString: process.env.DATABASE_URL
});

export default pool;