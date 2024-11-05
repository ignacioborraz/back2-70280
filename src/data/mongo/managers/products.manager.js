import Product from "../models/product.model.js";

const create = async (data) => {
    try {
        const one = await Product.create(data)
        return one
    } catch (error) {
        throw error
    }
}

const read = async () => {
    try {
        const all = await Product.find()
        return all
    } catch (error) {
        throw error
    }
}

const update = async (id, data) => {
    try {
        const opt = { new: true }
        const one = await Product.findByIdAndUpdate(id,data,opt)
        return one
    } catch (error) {
        throw error
    }
}

const destroy = async (id) => {
    try {
        const one = await Product.findByIdAndDelete(id)
        return one
    } catch (error) {
        throw error
    }
}

export { create, read, update, destroy }