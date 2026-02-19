import express from 'express';
import user from './user';
import recipe from './recipe';

const router = express.Router();

router.use('/user', user);
router.use('/recipe', recipe);

export default router;