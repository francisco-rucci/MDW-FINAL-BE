import express from 'express';
import controllers from './controllers';

const router = express.Router();

router.post('/', controllers.createRecipe);
router.get('/', controllers.getAllRecipes);
// router.get('/:id', controllers.getRecipeById);
// router.patch('/:id', controllers.updateRecipe);
router.delete('/hard/:id', controllers.hardDeleteRecipe);
router.patch('/soft/:id', controllers.softDeleteRecipe);

export default router;