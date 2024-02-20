import {Request, Response} from "express";
import UserService from "../service/UserService";

export default class UserController {
    private userService = new UserService();

    login = async (req: Request, res: Response) => {
        try {
            await this.userService.login(req, res);
        } catch (error: any) {
            console.error(error.stack);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Login error.' });
            }
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            await this.userService.register(req, res);
        } catch (error) {
            console.error(error);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Register error.' });
            }
        }
    }
}