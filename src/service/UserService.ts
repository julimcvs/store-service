import {Request, Response} from "express";
import UserRepository from "../repository/UserRepository";
import {User} from "../entity/User";
import {Address} from "../entity/Address";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export default class UserService {
    private repository = new UserRepository();

    login = async (req: Request, res: Response) => {
        const body = req.body;
        const existingUser = await this.repository.findByEmail(body.email);
        const secret = process.env.JWT_SECRET ?? 'secret'
        if (existingUser) {
            const isPasswordMatched = await bcrypt.compare(body.password, existingUser.password);
            if (!isPasswordMatched) {
                res.status(400).json({error: "Wrong password"});
                throw new Error("Wrong password")
            }
            const token = jwt.sign({
                id: existingUser.id,
                email: existingUser.email,
            }, secret, {
                expiresIn: '2 days'
            });
            return res.status(200).json({
                message: "Login successful",
                token: token,
            });
        }
        res.status(400).json({error: "User not found."});
        throw new Error("User not found.");
    }

    register = async (req: Request, res: Response) => {
        const body = req.body;
        const existingUser = await this.repository.findByEmail(body.email);
        if (existingUser) {
            res.status(400).json({error: "User already exists."});
            throw new Error("User already exists.");
        }
        const user = new User();
        await this.getUser(user, body);
        await user.save()
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    }

    private getAddress = (address: any) => {
        const newAddress = new Address();
        newAddress.number = address.number;
        newAddress.street = address.street;
        newAddress.state = address.state;
        newAddress.zipCode = address.zipCode;
        newAddress.neighborhood = address.neighborhood;
        return newAddress;
    }

    private async getUser(user: User, body: any) {
        const saltRounds = 10;
        user.birthDate = body.birthDate;
        user.email = body.email;
        user.cpf = body.cpf;
        user.name = body.name;
        user.address = this.getAddress(body.address);
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(body.password, salt);
        user.password = hash;
    }
}