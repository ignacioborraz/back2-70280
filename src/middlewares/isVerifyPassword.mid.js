import { readOne } from "../data/mongo/managers/users.manager.js"

async function isVerifyPassword(req, res, next) {
    try {
        const { email, password } = req.body
        const one = await readOne(email)
        // verificamos que el usuario existe
        if (one) {
            // luego verificamos que la contraseña de ese usuario es correcta
            const verify = password === one.password
            if (verify) {
                return next()
            }
        }
        const message = "INVALID CREDENTIALS"
        return res.status(401).json({ message })
    } catch (error) {
        return next(error)
    }
}

export default isVerifyPassword