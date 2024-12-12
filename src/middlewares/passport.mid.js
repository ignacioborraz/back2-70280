import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dao from "../dao/index.factory.js"
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js";
import { createTokenUtil, verifyTokenUtil } from "../utils/token.util.js";
import envUtil from "../utils/env.util.js";
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = envUtil;
const { UsersManager } = dao

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, email, password, done) => {
      try {
        const one = await UsersManager.readByEmail(email);
        if (one) {
          const info = { message: "USER ALREADY EXISTS", statusCode: 401 };
          return done(null, false, info);
        }
        const hashedPassword = createHashUtil(password);
        const user = await UsersManager.create({
          email,
          password: hashedPassword,
          name: req.body.name || "Default Name",
        });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await UsersManager.readByEmail(email);
        if (!user) {
          // const error = new Error("USER NOT FOUND");
          // error.statusCode = 401;
          // return done(error);
          const info = { message: "USER NOT FOUND", statusCode: 401 };
          return done(null, false, info);
        }
        const passwordForm = password; /* req.body.password */
        const passwordDb = user.password;
        const verify = verifyHashUtil(passwordForm, passwordDb);
        if (!verify) {
          // const error = new Error("INVALID CREDENTIALS");
          // error.statusCode = 401;
          // return done(error);
          const info = { message: "INVALID CREDENTIALS", statusCode: 401 };
          return done(null, false, info);
        }
        const data = {
          user_id: user._id,
          role: user.role,
        };
        const token = createTokenUtil(data);
        user.token = token;
        await update(user._id, { isOnline: true });
        return done(null, user);
      } catch (error) {
        console.log(error);
        
        return done(error);
      }
    }
  )
);
passport.use(
  "admin",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET_KEY,
    },
    async (data, done) => {
      try {
        //console.log(data);
        const { user_id, role } = data;
        if (role !== "ADMIN") {
          // const error = new Error("NOT AUTHORIZED")
          // error.statusCode = 403
          // return done(error)
          const info = { message: "NOT AUTHORIZE", statusCode: 403 };
          return done(null, false, info);
        }
        const user = await UsersManager.readById(user_id);
        return done(null, user);
      } catch (error) {}
    }
  )
);
passport.use(
  "online",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET_KEY,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await UsersManager.readById(user_id);
        const { isOnline } = user;
        if (!isOnline) {
          // const error = new Error("USER IS NOT ONLINE");
          // error.statusCode = 401;
          // return done(error);
          const info = { message: "USER IS NOT ONLINE", statusCode: 401 };
          return done(null, false, info);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "signout",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET_KEY,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        await UsersManager.update(user_id, { isOnline: false });
        // construiria un token que venza al instante
        return done(null, { user_id: null });
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      passReqToCallback: true,
      callbackURL: BASE_URL + "sessions/google/cb",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { id, picture } = profile;
        let user = await UsersManager.readByEmail(id);
        if (!user) {
          user = await UsersManager.create({
            email: id,
            photo: picture,
            password: createHashUtil(id),
          });
        }
        req.headers.token = createTokenUtil({
          role: user.role,
          user: user._id,
        });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
