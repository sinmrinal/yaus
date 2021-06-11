import { Pool } from "pg";
import server from "./server";

import YAUS from "./dao";

const connect = async () => {
	try {
		const pool = new Pool({
			max: 10,
			connectionTimeoutMillis: 0,
			idleTimeoutMillis: 10000,
		});
		const client = await pool.connect();
		await client.query("CREATE TABLE IF NOT EXISTS yaus (s_url varchar PRIMARY KEY,url varchar);");
		client.release();
		await YAUS.injectDB(pool);
		return true;
	} catch (error) {
		console.error(error.stack);
		return false;
	}
};

const port = process.env.PORT || 8000;
server.listen(port, async () => {
	const connected = await connect();
	if (connected) {
		console.log(`Connection established with database.`);
		console.log(`listening on port ${port}`);
	} else {
		console.error("Enable to establish a connection with database.");
		process.exit(-1);
	}
});
