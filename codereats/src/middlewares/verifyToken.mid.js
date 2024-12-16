import { verifyTokenUtil } from "../utils/token.util.js";

async function verifyToken(req, res, next) {
  const token = req?.cookies?.token;
  const data = verifyTokenUtil(token);
  req.token = data;
  return next();
}

export default verifyToken;
