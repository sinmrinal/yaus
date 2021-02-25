import { Router } from 'express';
import { get } from "../db";

const router = Router();

router.get('/:url', async (request, response) => {
    const query_url = request.params.link;
    try {
        const url = await get(query_url);
        return response.status(200).json(url)
    } catch (error) {
        return response.status(400).json(error)
    }
});

export default router;
