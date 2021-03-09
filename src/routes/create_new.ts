import { Router } from 'express';

import YAUS from '../db';
const router = Router();

router.post('/', async (request, response) => {
    const { original_url, custom_url } = request.body
    if (!original_url || typeof original_url !== "string") {
        response.status(400).json({ error: "Bad Source URL format, expected string." })
        return
    }
    try {
        const link: {s_url: string, url: string} | undefined = await YAUS.add(custom_url, original_url);
        if (!link) throw new Error("Unable to create new URL.");
        return response
            .status(200)
            .json(link);
    } catch (error) {
        console.error(error)
        return response.status(500).json(error)
    }
});

export default router;
