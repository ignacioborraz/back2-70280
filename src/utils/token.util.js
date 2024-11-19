import jwt from "jsonwebtoken"
const { SECRET_KEY } = process.env

function createTokenUtil(data) {
    const token = jwt.sign(
        data,
        SECRET_KEY,
        { expiresIn: 60 * 60 * 24 * 7 }
    )
    return token
}

function verifyTokenUtil(token) {
    const verifyData = jwt.verify(token, SECRET_KEY)
    return verifyData
}

export { createTokenUtil, verifyTokenUtil }