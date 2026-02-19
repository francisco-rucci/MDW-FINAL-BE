import { Request, Response } from 'express';
import admin from '../../firebase';
import User from '../../models/User';

// This method creates a user from the backend using Firebase Admin SDK for testing with Postman
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password, name, lastName } = req.body;

        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        const user = new User({
            name,
            lastName,
            email,
            firebaseUid: userRecord.uid,
        });

        await user.save();

        res.status(201).json({
            message: "Usuario registrado exitosamente",
            firebaseUser: userRecord,
            user,
            error: false,
        });
    } catch (error: any) {
        let msg = "Error al registrar el usuario";
        if (error.code === 'auth/email-already-exists') {
            msg = "El email ya está registrado en Firebase";
        }

        res.status(500).json({
            message: msg,
            error: true,
            details: error.message
        });
    }
};

export default { registerUser };