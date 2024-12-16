function isAdmin(req, res, next) {
  const { role } = req.token;
  if (role !== "ADMIN") {
    const error = new Error("FORBIDDEN");
    error.statusCode = 403;
    throw error;
  }
  return next();
}

export default isAdmin;
