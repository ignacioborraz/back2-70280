import { Router } from "express";
import { create, read, update, destroy } from "../../data/mongo/managers/users.manager.js";

const usersApiRouter = Router()

usersApiRouter.post("/", async (req, res, next) => {
    try {
        const message = "USER CREATED"
        const data = req.body
        const response = await create(data)
        return res.status(201).json({ response, message })
    } catch (error) {
        return next(error)
    }
})

usersApiRouter.get("/", async (req, res, next) => {
    try {
        const message = "USERS FOUND"
        const response = await read()
        return res.status(200).json({ response, message })
    } catch (error) {
        return next(error)
    }
})

usersApiRouter.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        const message = "USER UPDATED"
        const response = await update(id, data)
        return res.status(200).json({ response, message })
    } catch (error) {
        return next(error)
    }
})

usersApiRouter.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const message = "USER DELETED"
        const response = await destroy(id)
        return res.status(200).json({ response, message })
    } catch (error) {
        return next(error)
    }
})

export default usersApiRouter