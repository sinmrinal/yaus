import { Router } from 'express';

import { add } from "../db";
const router = Router();

router.post('/', async (request, response) => {
    const original_url = request.body.original_url || undefined;
    const custom_url = request.body.custom_url || undefined
    if (!original_url) {
        return response
            .status(400)
            .json({ message: 'URL must be provided.' });
    }

    try {
    const link = await add(custom_url, original_url);
    return response
        .status(200)
        .json(link);
    } catch (error) {
        return response.status(400).json(error)
    }
});

export default router;
