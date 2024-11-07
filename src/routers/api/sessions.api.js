import { Router } from "express";
import { create } from "../../data/mongo/managers/users.manager.js";
import isVerifyPassword from "../../middlewares/isVerifyPassword.mid.js";

const sessionsRouter = Router()

sessionsRouter.post("/register", 
    // middleware para validar campos obligatorios!
    // middleware de usuario inexistente
    async(req, res, next)=> {
    try {
        const data = req.body
        const response = await create(data)
        const message = "USER REGISTERED"
        return res.status(201).json({ message, response })
    } catch (error) {
        return next(error)
    }
})

sessionsRouter.post("/login", 
    // middlewares para verificar que el usuario y la contraseña son correcta
    isVerifyPassword,
    (req, res, next)=> {
    try {
        req.session.online = true
        req.session.email = req.body.email
        const message = "USER LOGGED IN"
        return res.status(200).json({ message })
    } catch (error) {
        return next(error)
    }
})

sessionsRouter.post("/signout", async(req, res, next)=> {
    try {
        const sessions = req.session
        req.session.destroy()
        return res.status(200).json({ message: "USER SIGNED OUT", sessions })
    } catch (error) {
        return next(error)
    }
})

sessionsRouter.post("/online", (req, res, next)=> {
    try {
        const sessions = req.session
        console.log(sessions);        
        if (sessions.online) {
            return res.status(200).json({ message: "USER IS ONLINE", sessions })
        }
        return res.status(401).json({ message: "INVALID CREDENTIALS" })
    } catch (error) {
        return next(error)
    }
})

export default sessionsRouter