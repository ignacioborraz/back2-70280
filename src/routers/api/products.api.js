import { Router } from "express";
import { create, read, update, destroy } from "../../data/mongo/managers/products.manager.js";

const productsApiRouter = Router()

productsApiRouter.post("/", async (req, res, next) => {
    try {
        const message = "PRODUCT CREATED"
        const data = req.body
        const response = await create(data)
        return res.status(201).json({ response, message })
    } catch (error) {
        return next(error)
    }
})

productsApiRouter.get("/", async (req, res, next) => {
    try {
        const message = "PRODUCTS FOUND"
        const response = await read()
        return res.status(200).json({ response, message })
    } catch (error) {
        return next(error)
    }
})

productsApiRouter.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        const message = "PRODUCT UPDATED"
        const response = await update(id, data)
        return res.status(200).json({ response, message })
    } catch (error) {
        return next(error)
    }
})
productsApiRouter.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const message = "PRODUCT DELETED"
        const response = await destroy(id)
        return res.status(200).json({ response, message })
    } catch (error) {
        return next(error)
    }
})

export default productsApiRouter