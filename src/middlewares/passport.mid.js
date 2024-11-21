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
      /* OBJETO DE CONFIGURACION */ passReqToCallback: true,
      usernameField: "email", // Campo que se usará como nombre de usuario
      passwordField: "password", // Campo que se usará para la contraseña
    },
    async (req, email, password, done) => {
      /* CB CON LA LOGICA DE LA ESTRATEGIA */
      try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await readByEmail(email);
        if (existingUser) {
          const error = new Error("USER ALREADY EXISTS");
          error.statusCode = 401;
          return done(error);
        }
        // Hashear la contraseña antes de guardarla
        const hashedPassword = createHashUtil(password);
        // Crear el nuevo usuario
        const newUser = await create({
          email,
          password: hashedPassword,
          name: req.body.name || "Default Name", // Opcional: agregar otros campos como el nombre
          role: req.body.role || "USER", // Asignar un rol por defecto
        });
        //retorno usuario recien creado
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
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
  new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, email, password, done) => {
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
  })
);
/**
 * @admin
 * Similar a "login", pero adicionalmente verifica si el usuario tiene un rol administrativo.
 * Rechaza usuarios que no tienen permisos de administrador.
 */
passport.use(
  "admin",
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
 * @online
 * Valida al usuario mediante credenciales locales.
 * Puede servir para controlar el estado en tiempo real de usuarios conectados a la aplicación.
 */
passport.use(
  "online",
  new LocalStrategy(
    {
      /* OBJETO DE CONFIGURACION */
      passReqToCallback: true,
      usernameField: "email", // Campo que se usará como nombre de usuario
      passwordField: "password", // Campo que se usará para la contraseña
    },
    async (req, email, passport, done) => {
      /* CB CON LA LOGICA DE LA ESTRATEGIA */
      try {
        // Verificar si el usuario ya existe en la base de datos
        const user = await readByEmail(email);
        // Verificar la contraseña
        const isPasswordValid = verifyHashUtil(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Incorrect password" });
        } // Validar si el usuario está en línea // Esto dependerá de tu implementación: aquí asumimos que tienes un campo `isOnline`
        if (!user.isOnline) {
          return done(null, false, { message: "User is not online" });
        }
      } catch (error) {
        return done(null, user);
      }
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
    {
      /* OBJETO DE CONFIGURACION */
    },
    async () => {
      /* CB CON LA LOGICA DE LA ESTRATEGIA */
    }
  )
);
passport.use(
  "google",
  new GoogleStrategy(
    { clientID: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET, passReqToCallback: true, callbackURL: BASE_URL + "sessions/google/cb" },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { id, picture } = profile;
        let user = await readByEmail(id);
        if (!user) {
          user = await create({ email: id, photo: picture, password: createHashUtil(id) });
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
