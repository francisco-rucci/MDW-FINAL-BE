import { Request, Response } from 'express';
import User from '../../models/User';

export const createUserFromClient = async (req: Request, res: Response) => {
    try {
        const { name, lastName, email, firebaseUid, isActive } = req.body;

        if (!firebaseUid) {
            return res.status(400).json({ 
                message: "Falta el identificador de Firebase (firebaseUid)", 
                error: true 
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: "El usuario ya existe en la base de datos", 
                error: true 
            });
        }

        // Lo guardamos en MongoDB
        const user = new User({
            name,
            lastName,
            email,
            firebaseUid,
            isActive: isActive ?? true
        });

        await user.save();

        res.status(201).json({
            message: "Usuario guardado en MongoDB exitosamente",
            data: user,
            error: false,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Error al guardar el usuario en la base de datos",
            error: true,
            details: error.message
        });
    }
};

export default { createUserFromClient };