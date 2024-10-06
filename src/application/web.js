import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import {errorMiddleware} from "../middleware/error-middleware.js";
import { publicRouter } from "../routes/public-api.js";
import { userRouter } from "../routes/auth-api.js";
import apiDocumentation from "../../docs/api-docs.json" assert { type: "json" };

const upload = multer(); 
dotenv.config();
export const web = express();

// SWAGGER
web.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));


web.use(cors()); 
web.use(express.json());
web.use(upload.none());
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);
