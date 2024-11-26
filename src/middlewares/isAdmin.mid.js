function isAdmin(req, res, next) {
  try {
    const { role } = req.token;
    if (role !== "ADMIN") {
      const error = new Error("FORBIDDEN");
      error.statusCode = 403;
      throw error;
    }
    return next();
  } catch (error) {
    return next(error);
  }
}
export default isAdmin;
