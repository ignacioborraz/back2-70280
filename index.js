import envUtil from "./src/utils/env.util.js"
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import indexRouter from "./src/routers/index.router.js";
import dbConnect from "./src/utils/dbConnect.util.js";
import argsUtil from "./src/utils/args.util.js";

// server
const server = express();
const port = envUtil.PORT;
const ready = () => {
  console.log("server ready on port " + port);
  console.log("server on mode " + argsUtil.env);  
  if (argsUtil.persistence === "mongo") {
    dbConnect();
  }
};
server.listen(port, ready);

// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));
server.use(cookieParser(envUtil.SECRET_KEY));
server.use(
  session({
    secret: envUtil.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: envUtil.MONGO_LINK,
      ttl: 60 * 60 * 24,
    }),
  })
);

// routers
server.use(indexRouter);
server.use(errorHandler);
server.use(pathHandler);

//console.log(argsUtil);
//console.log(argsUtil.persistence);
//console.log(argsUtil.env);
//console.log(process.pid);
//console.log(process.argv);
//console.log(process.argv[3]);
//console.log(process.argv[4]);
