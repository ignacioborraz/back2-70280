import passport from "./passport.mid.js";

export default (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(info.statusCode || 400).json({
          error: info.message || "ERROR"
        });
      }
      req.user = user;
      return next();
    })(req, res, next);
  };
};
