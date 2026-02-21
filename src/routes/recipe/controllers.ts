import { Request, Response } from "express";
import Recipe from "../../models/Recipe";
import User from "../../models/User";
import { CustomRequest } from "../../middlewares/auth";
export const createRecipe = async (req: CustomRequest, res: Response) => {
    try {

        const { title, description, ingredients, image } = req.body;

        const firebaseUid = req.user?.uid;

        const user = await User.findOne({ firebaseUid });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado en la base de datos", error: true });
        }

        const recipe = new Recipe({
            title,
            description,
            ingredients,
            image,
            user: user._id,
        });

        await recipe.save();

        res.status(201).json({
            message: "Receta creada exitosamente",
            data: recipe,
            error: false,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la receta",
            error: true,
        });
    }
};

export const getAllRecipes = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;
        let query: any = { active: true };

        if (search) {
            query = {
                ...query,
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { ingredients: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const recipes = await Recipe.find(query).populate('user', 'username');
        res.status(200).json({ data: recipes, error: false });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener recetas", error: true });
    }
};

export const hardDeleteRecipe = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const recipe = await Recipe.findByIdAndDelete(id);

        if (!recipe) {
            return res.status(404).json({ message: "Receta no encontrada", error: true });
        }

        res.status(200).json({ message: "Receta eliminada correctamente", error: false });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la receta", error: true });
    }
};

export const softDeleteRecipe = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const recipe = await Recipe.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!recipe) {
            return res.status(404).json({ message: "Receta no encontrada", error: true });
        }

        res.status(200).json({ message: "Receta desactivada correctamente", error: false });
    } catch (error) {
        res.status(500).json({ message: "Error al desactivar la receta", error: true });
    }
};

export const updateRecipe = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { title, description, ingredients, image } = req.body;

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { title, description, ingredients, image },
            { new: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Receta no encontrada", error: true });
        }

        res.status(200).json({
            message: "Receta actualizada correctamente",
            data: updatedRecipe,
            error: false,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la receta", error: true });
    }
};

export const getMyRecipes = async (req: CustomRequest, res: Response) => {
    try {
        const firebaseUid = req.user?.uid; 

        const user = await User.findOne({ firebaseUid });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado", error: true });
        }

        const myRecipes = await Recipe.find({ user: user._id, isActive: true })
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Tus recetas obtenidas exitosamente",
            data: myRecipes,
            error: false,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tus recetas", error: true });
    }
};

export const getRecipeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const recipe = await Recipe.findById(id).populate('user', 'username email');

        if (!recipe) {
            return res.status(404).json({ message: "Receta no encontrada", error: true });
        }

        res.status(200).json({
            message: "Receta obtenida con éxito",
            data: recipe,
            error: false,
        });
    } catch (error) {

        res.status(500).json({ message: "Error al buscar la receta", error: true });
    }
};

export const toggleFavoriteRecipe = async (req: CustomRequest, res: Response) => {
    try {
        const { id } = req.params;
        const firebaseUid = req.user?.uid;

        const user = await User.findOne({ firebaseUid });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado", error: true });
        }

        const isFavorite = user.favorites.includes(id as any);

        if (isFavorite) {
            await User.findByIdAndUpdate(user._id, { $pull: { favorites: id } });
            return res.status(200).json({ message: "Receta eliminada de favoritos", error: false });
        } else {
            await User.findByIdAndUpdate(user._id, { $addToSet: { favorites: id } });
            return res.status(200).json({ message: "Receta agregada a favoritos", error: false });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar favoritos", error: true });
    }
};

export default { createRecipe, getAllRecipes, hardDeleteRecipe, softDeleteRecipe, updateRecipe, getMyRecipes, getRecipeById, toggleFavoriteRecipe};