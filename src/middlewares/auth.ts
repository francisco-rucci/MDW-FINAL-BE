import { Request, Response, NextFunction } from 'express';
import admin from '../firebase';

export interface CustomRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void | Response> => {
    try {

        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                error: true, 
                message: 'Acceso denegado. No se proporcionó un token válido.' 
            });
        }

        const token = authHeader.split(' ')[1];

        const decodedToken = await admin.auth().verifyIdToken(token);
        
        req.user = decodedToken;
        
        next();
    } catch (error) {
        return res.status(403).json({ 
            error: true, 
            message: 'Token inválido o expirado.',
            details: error
        });
    }
};