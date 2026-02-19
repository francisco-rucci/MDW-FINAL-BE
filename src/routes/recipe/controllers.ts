import { Request, Response } from "express";
import Recipe from "../../models/Recipe";
import User from "../../models/User";

export const createRecipe = async (req: Request, res: Response) => {
    try {
        const { title, description, ingredients, image, firebaseUid } = req.body;

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
        const recipes = await Recipe.find({ isActive: true })
            .populate("user", "name lastName")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Recetas obtenidas exitosamente",
            data: recipes,
            error: false,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las recetas",
            error: true,
        });
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

export default { createRecipe, getAllRecipes, hardDeleteRecipe, softDeleteRecipe };