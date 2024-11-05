import "dotenv/config.js"
import express from "express"
import morgan from "morgan"
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
server.use(morgan("dev"))

// routers
server.use(indexRouter)
server.use(errorHandler)
server.use(pathHandler)