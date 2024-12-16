import "dotenv/config.js"
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors"
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import indexRouter from "./src/routers/index.router.js";

// server
const server = express();
const port = process.env.PORT || 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cookieParser());
server.use(cors({ origin: true, credentials: true }))

// routers
server.use(indexRouter);
server.use(errorHandler);
server.use(pathHandler);