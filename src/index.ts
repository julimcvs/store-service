import dotenv from "dotenv";
dotenv.config();

import express, {Express, NextFunction, Request, Response} from "express";
import {AppDataSource} from "./data-source"
import mainRouter from './routes/routes';
import bodyParser from "body-parser";
import cors from 'cors';

const app: Express = express();

const port = process.env.PORT;

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,OPTIONS,PUT,POST,DELETE',
    credentials: true,
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400,
}));

app.use(mainRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    res.status(500).json({error: {message: "Something went wrong"}});
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

AppDataSource.initialize().then(async () => {
    console.log('DB Connection initialized');
}).catch(error => console.log(error))

export default app;