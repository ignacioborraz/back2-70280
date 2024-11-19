import "dotenv/config.js"
import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"
import pathHandler from "./src/middlewares/pathHandler.mid.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import indexRouter from "./src/routers/index.router.js"
import dbConnect from "./src/utils/dbConnect.util.js"

// server
const server = express()
const port = process.env.PORT
const ready = ()=> {
    console.log("server ready on port "+port);
    dbConnect()
}
server.listen(port, ready)

// middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static("public"))
server.use(morgan("dev"))
server.use(cookieParser(process.env.SECRET_KEY))
server.use(session({
    secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true,
    store: new MongoStore({ mongoUrl: process.env.MONGO_LINK, ttl: 60*60*24 })
}))

// routers
server.use(indexRouter)
server.use(errorHandler)
server.use(pathHandler)