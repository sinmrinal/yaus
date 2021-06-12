import { Pool } from "pg";
import { expressServer, redisClient } from "./server";

import YAUS from "./dao";

const connectdb = async () => {
	try {
		const pool = new Pool({
			max: 10,
			connectionTimeoutMillis: 0,
			idleTimeoutMillis: 10000,
		});
		const client = await pool.connect();
		await client.query("CREATE TABLE IF NOT EXISTS yaus (s_url varchar PRIMARY KEY,url varchar);");
		client.release();
		await YAUS.injectDB(pool, redisClient);
		return true;
	} catch (error) {
		console.error(error.stack);
		return false;
	}
};


const port = process.env.PORT || 8000;
expressServer.listen(port, async () => {
	const connected = await connectdb();
	if (connected) {
		console.log(`Connection established with database.`);
		console.log(`listening on port ${port}`);
	} else {
		console.error("Enable to establish a connection with database.");
		process.exit(-1);
	}
});
