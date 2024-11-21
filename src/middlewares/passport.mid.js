import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import { create, readByEmail } from "../data/mongo/managers/users.manager.js"
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js"
import { createTokenUtil } from "../utils/token.util.js"
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env

/**
 * @register
 * Verifica que el correo no exista en la base de datos.
 * Crea un nuevo usuario utilizando un hash de la contraseña.
 * Retorna al usuario recién registrado.
*/
passport.use("register", new LocalStrategy(
    { /* OBJETO DE CONFIGURACION */ },
    async () => { /* CB CON LA LOGICA DE LA ESTRATEGIA */ }
))
/**
 * @login
 * Busca el usuario por correo en la base de datos.
 * Verifica si la contraseña ingresada coincide con el hash almacenado.
 * Retorna el usuario si la autenticación es exitosa.
*/
passport.use("login", new LocalStrategy(
    { /* OBJETO DE CONFIGURACION */ },
    async () => { /* CB CON LA LOGICA DE LA ESTRATEGIA */ }
))
/**
 * @admin
 * Similar a "login", pero adicionalmente verifica si el usuario tiene un rol administrativo.
 * Rechaza usuarios que no tienen permisos de administrador.
*/
passport.use("admin", new LocalStrategy(
    { /* OBJETO DE CONFIGURACION */ },
    async () => { /* CB CON LA LOGICA DE LA ESTRATEGIA */ }
))
/**
 * @online
 * Valida al usuario mediante credenciales locales.
 * Puede servir para controlar el estado en tiempo real de usuarios conectados a la aplicación.
*/
passport.use("online", new LocalStrategy(
    { /* OBJETO DE CONFIGURACION */ },
    async () => { /* CB CON LA LOGICA DE LA ESTRATEGIA */ }
))
/**
 * @signout
 * Invalida tokens o sesiones activas.
 * Retorna un estado indicando que la operación fue exitosa.
*/
passport.use("signout", new LocalStrategy(
    { /* OBJETO DE CONFIGURACION */ },
    async () => { /* CB CON LA LOGICA DE LA ESTRATEGIA */ }
))
passport.use("google", new GoogleStrategy(
    { clientID: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET, passReqToCallback: true, callbackURL: BASE_URL + "sessions/google/cb" },
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            const { id, picture } = profile
            let user = await readByEmail(id)
            if (!user) {
                user = await create({ email: id, photo: picture, password: createHashUtil(id) })
            }
            req.token = createTokenUtil({ role: user.role, user: user._id })
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))

export default passport