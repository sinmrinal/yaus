import { Request, Response } from "express";
import { find } from "../persistence/link";

async function redirector(req: Request, res: Response) {
    const query_url = req.params.link
    // const data = await db.query(`SELECT * FROM link WHERE s_url = ${query_url}`);
    console.log(query_url)
    res.send("hello")
}


export default redirector;