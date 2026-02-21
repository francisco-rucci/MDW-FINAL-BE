import express from 'express';
import controllers from './controllers';
import { verifyToken } from '../../middlewares/auth';
import { validateRecipe } from '../../middlewares/recipeValidation';

const router = express.Router();

// Ruta publica
router.get('/', controllers.getAllRecipes);
router.get('/:id', controllers.getRecipeById);

// Ruta privada
router.get('/my-recipes', verifyToken, controllers.getMyRecipes);
router.post('/', verifyToken, validateRecipe, controllers.createRecipe);
router.patch('/:id', verifyToken, validateRecipe, controllers.updateRecipe);

router.post('/favorite/:id', verifyToken, controllers.toggleFavoriteRecipe);

router.delete('/hard/:id', verifyToken, controllers.hardDeleteRecipe);
router.patch('/soft/:id', verifyToken, controllers.softDeleteRecipe);

export default router;