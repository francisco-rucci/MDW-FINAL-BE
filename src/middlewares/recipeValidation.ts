import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const recipeSchema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'El título no puede estar vacío.',
        'string.min': 'El título debe tener al menos 3 caracteres.',
        'any.required': 'El título es un campo obligatorio.'
    }),
    description: Joi.string().min(10).required().messages({
        'string.empty': 'La descripción no puede estar vacía.',
        'string.min': 'La descripción debe tener al menos 10 caracteres.',
        'any.required': 'La descripción es obligatoria.'
    }),
    ingredients: Joi.string().min(5).required().messages({
        'string.empty': 'Los ingredientes no pueden estar vacíos.',
        'any.required': 'Los ingredientes son obligatorios.'
    }),
    instructions: Joi.string().min(10).required().messages({
        'string.empty': 'Las instrucciones no pueden estar vacías.',
        'string.min': 'Las instrucciones deben tener al menos 10 caracteres.',
        'any.required': 'Las instrucciones son obligatorias.'
    }),
    image: Joi.string().uri().optional().messages({
        'string.uri': 'La imagen debe ser una URL válida.'
    })
});

export const validateRecipe = (req: Request, res: Response, next: NextFunction): void | Response => {
    const { error } = recipeSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({
            error: true,
            message: 'Error en la validación de datos',
            details: errorMessages
        });
    }

    next();
};