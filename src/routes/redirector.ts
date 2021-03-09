import { Router } from 'express';
import YAUS from '../db';

const router = Router();

router.get('/:url', async (request, response) => {
    const query_url = request.params.link;
    try {
        const url = await YAUS.get(query_url);
        if (!url)
            return response.status(400).json({error: 'Not Found'})
        return response.status(200).json(url)
    } catch (error) {
        console.error(error)
        return response.status(400).json({ error: 'Not Found' })
    }
});

export default router;
