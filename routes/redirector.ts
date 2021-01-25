import { Router } from 'express';
import Link from "../model/link";

const router = Router();

router.get('/:url', async (request, response) => {
    const query_url = request.params.link;
    const url = Link.find(query_url);
    response.send(url);
});

export default router;
