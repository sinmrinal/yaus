import { Pool } from 'pg';
import server from "./server";

import YAUS from './db';

const pool = new Pool({
    max: 10,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 10000
})

pool.on('error', (error, client) => {
    console.error("Enable to establish a connection with database.")
    console.error(error.stack)
    process.exit(1)
})

pool
    .connect()
    .then(async client => {
        try {
            await client
                .query("CREATE TABLE IF NOT EXISTS yaus ( \
            s_url varchar PRIMARY KEY, \
            url varchar \
            );")
            client.release();
            await YAUS.injectDB(pool)
        } catch (error) {
            client.release();
            console.error(error.stack)
            process.exit(1)
        }
    })

const port = process.env.PORT || 8000
server.listen(port, () => {
    console.log(`listening on port ${port}`)
})