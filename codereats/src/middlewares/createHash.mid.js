import { createHashUtil } from "../utils/hash.util.js";

function createHash(req, res, next) {
  let { password } = req.body;
  password = createHashUtil(password);
  req.body.password = password;
  return next();
}

export default createHash;
