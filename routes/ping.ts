import { Get, Route } from "tsoa";
import express from 'express';

import { logger } from '../server';

const router = express.Router();

router.get('/ping', (req, res) => {
    logger.info(req.url)
    res.send('pong');
})

export default router;