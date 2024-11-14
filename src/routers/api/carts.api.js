import { Router } from "express";
import { create, read, update, destroy } from "../../data/mongo/managers/carts.manager.js";

const cartsApiRouter = Router()

cartsApiRouter.post("/", createCart)
cartsApiRouter.get("/:user_id", readCartsFromUser)
cartsApiRouter.put("/:id", updateCart)
cartsApiRouter.delete("/:id", destroyCart)

export default cartsApiRouter

async function createCart(req, res, next) {
    try {
        const message = "CART CREATED"
        const data = req.body
        const response = await create(data)
        return res.status(201).json({ response, message })
    } catch (error) {
        return next(error)
    }
}
async function readCartsFromUser(req, res, next) {
    try {
        const { user_id } = req.params
        const message = "CARTS FOUND"
        const response = await read({ user_id })
        return res.status(200).json({ response, message })
    } catch (error) {
        return next(error)
    }
}
async function updateCart(req, res, next) {
    try {
        const { id } = req.params
        const data = req.body
        const message = "CART UPDATED"
        const response = await update(id, data)
        return res.status(200).json({ response, message })
    } catch (error) {
        return next(error)
    }
}
async function destroyCart(req, res, next) {
    try {
        const { id } = req.params
        const message = "CART DELETED"
        const response = await destroy(id)
        return res.status(200).json({ response, message })
    } catch (error) {
        return next(error)
    }
}