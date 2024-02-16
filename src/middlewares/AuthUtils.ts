import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const secret = process.env.JWT_SECRET ?? '5T0R3'
        const token = req.header('Authorization')?.replace('Bearer', '').trim();

        if (token) {
            (req as CustomRequest).token = jwt.verify(token, secret);
            next();
            return;
        }
        throw new Error('User is not authenticated.');
    } catch (err) {
        res.status(401).json({error: 'User is not authenticated.'});
    }
}