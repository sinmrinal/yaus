import { Router } from 'express';
import Hashids from "hashids";

import Link from "../model/link";
const router = Router();

router.post('/', async (request, response) => {
    const { custom_url, original_url } = request.body;
    if (!original_url) {
        return response
            .status(400)
            .json({ message: 'URL must be provided.' });
    }

    if (!custom_url) {
        const hashids = new Hashids()
        const custom_url = hashids.encode(Date.parse(new Date().toISOString()))
    }

    const link = await Link.create(custom_url, original_url);
    if (link === "Created") {
        return response
            .status(200)
            .json({ url: custom_url });
    }
    return response
        .status(400)
        .json({ url: link });
});

export default router;
