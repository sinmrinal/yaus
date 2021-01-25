// const table = "CREATE TABLE IF NOT EXISTS link ( \
//     s_url STRING \
//     hit INTEGER DEFAULT 0 \
//     url STRING \
//     );";

// client.query(table)


import db from './db';

const create = async (s_url: string, url: string) => {
    try {
        const { rows } = await db.query(`
        INSERT INTO link (s_url, url)
            VALUES (${s_url}, ${url});
        `);
        return true;
    } catch (error) {
        return error.constraint
    }
}

const find = async (s_url: string) => {
    const { rows } = await db.query(`
    SELECT * FROM link WHERE s_url=${s_url} LIMIT 1;
    `);
    return rows[0];
}

export { create, find }
