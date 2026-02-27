import express from 'express';
import controllers from './controllers';

const router = express.Router();

router.post('/', controllers.createUserFromClient);

export default router;