import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { create, readByEmail } from "../data/mongo/managers/users.manager.js";
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js";
import { createTokenUtil } from "../utils/token.util.js";
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

/**
 * @register
 * Verifica que el correo no exista en la base de datos.
 * Crea un nuevo usuario utilizando un hash de la contraseña.
 * Retorna al usuario recién registrado.
 */
passport.use(
  "register",
  new LocalStrategy(
    {
      /* OBJETO DE CONFIGURACION */
    },
    async () => {
      /* CB CON LA LOGICA DE LA ESTRATEGIA */
    }
  )
);
/**
 * @login
 * Busca el usuario por correo en la base de datos.
 * Verifica si la contraseña ingresada coincide con el hash almacenado.
 * Generar el token de autenticación
 * Retorna el usuario si la autenticación es exitosa.
 */
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await readByEmail(email);
        if (!user) {
          const error = new Error("USER NOT FOUND");
          error.statusCode = 401;
          return done(error);
        }
        const passwordForm = password; /* req.body.password */
        const passwordDb = user.password;
        const verify = verifyHashUtil(passwordForm, passwordDb);
        if (!verify) {
          const error = new Error("INVALID CREDENTIALS");
          error.statusCode = 401;
          return done(error);
        }
        const data = {
          user_id: user._id,
          role: user.role,
        };
        const token = createTokenUtil(data);
        req.token = token;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
/**
 * @admin
 * Similar a "login", pero adicionalmente verifica si el usuario tiene un rol administrativo.
 * Rechaza usuarios que no tienen permisos de administrador.
 */
passport.use(
  "admin",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    /* CB CON LA LOGICA DE LA ESTRATEGIA */
    async (req, done) => {
      try {
        const token = req.token;
        const { role, user_id } = verifyTokenUtil(token);
        if (role !== "ADMIN") {
          const error = new Error("UNAUTHORIZED");
          error.statusCode = 403;
          return done(error);
        }
        const user = await readById(user_id);
        user.password = null;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
/**
 * @online
 * Valida al usuario mediante credenciales locales.
 * Puede servir para controlar el estado en tiempo real de usuarios conectados a la aplicación.
 */
passport.use(
  "online",
  new LocalStrategy(
    {
      /* OBJETO DE CONFIGURACION */
    },
    async () => {
      /* CB CON LA LOGICA DE LA ESTRATEGIA */
    }
  )
);
/**
 * @signout
 * Invalida tokens o sesiones activas.
 * Retorna un estado indicando que la operación fue exitosa.
 */
passport.use(
  "signout",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async () => {
      /* CB CON LA LOGICA DE LA ESTRATEGIA */
      try {
        const token = req.token;
        if (!token) {
          const error = new Error("USER NOT LOGGED");
          error.statusCode = 401;
          return done(error);
        }
        delete req.token;
        return done(null, null);
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
        let user = await readByEmail(id);
        if (!user) {
          user = await create({
            email: id,
            photo: picture,
            password: createHashUtil(id),
          });
        }
        req.token = createTokenUtil({ role: user.role, user: user._id });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
