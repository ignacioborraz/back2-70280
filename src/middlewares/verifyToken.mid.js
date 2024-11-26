import { verifyTokenUtil } from "../utils/token.util.js";

async function verifyToken(req, res, next) {
    try {
        const token = req?.cookies?.token
        //console.log(token);        
        const data = verifyTokenUtil(token)
        req.token = data
        return next()
    } catch (error) {
        return next(error)
    }
}
export default verifyToken