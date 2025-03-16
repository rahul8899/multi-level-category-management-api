import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from 'cors';
import { errors } from "celebrate";
import { NotFoundResponse } from "./helpers/http";
import { Routes } from "./routes";
import connectToMongoDB from "./db";

const PORT = process.env.PORT;
export class AppServer {
    public app: express.Application = express();
    constructor() {

    }

    createServer = () => {
        this.app.all("/*", (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Request-Headers", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization, token, x-device-type, x-app-version, x-build-number, uuid,x-auth-token,X-L10N-Locale,x-auth-organization,Content - Disposition");
            res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
            res.header("Access-Control-Expose-Headers", "Authorization");
            res.header("Access-Control-Expose-Headers", "Content-Disposition");
            next();
        });

        this.setupMiddlewares();

        this.setupRoutes();

        this.app.use(errors());

        this.app.listen(PORT, async () => {
            console.log("Server Running on port : " + PORT);
            await connectToMongoDB();
        });

        // this.app.use((req, res) => {
        //     return NotFoundResponse(res, req.originalUrl + ' not found');
        // });
    }

    setupMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    setupRoutes() {
        const routes = new Routes();
        this.app.use("/api/", routes.path());
    }
}

// new AppServer().createServer();