import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import { create, readByEmail } from "../data/mongo/managers/users.manager.js"
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js"
import { createTokenUtil } from "../utils/token.util.js"
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env

passport.use("register", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            // la gracia de definir una estrategia de passport
            // es simplificar TOOODOS los middlewares e incluso register
            if (!email || !password) {
                // no hace falta definirlo porque passport responde por defecto
            }
            const one = await readByEmail(email)
            if (one) {
                const error = new Error("User already exists")
                error.statusCode = 400
                // throw error
                // no se arroja el error porque en cambio se usa DONE
                return done(error)
            }
            req.body.password = createHashUtil(password)
            const data = req.body
            const user = await create(data)
            return done(null, user)
        } catch (error) {
            return done(error)
        }

    }
))
passport.use("login", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            const user = await readByEmail(email)
            if (!user) {
                const error = new Error("INVALID CREDENTIALS")
                error.statusCode = 401
                return done(error)
            }
            const dbPassword = user.password
            const verify = verifyHashUtil(password, dbPassword)
            if (!verify) {
                const error = new Error("INVALID CREDENTIALS")
                error.statusCode = 401
                return done(error)
            }
            // y luego inicia sesión "automaticamente"
            // req.session.role = user.role
            // req.session.user_id = user._id
            // los datos de la session se deben guardar en un token
            req.token = createTokenUtil({ role: user.role, user_id: user._id })
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))
passport.use("google", new GoogleStrategy(
    { clientID: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET, passReqToCallback: true, callbackURL: BASE_URL+"sessions/google/cb" },
    async (req, accessToken, refreshToken, profile, done)=>{
        try {
            // desestructuro de los datos de google el id del usuario y su foto/avatar
            // console.log(profile);            
            const { id, picture } = profile
            // como estrategia de terceros NO SE SUELE registrar al usuario por su email sino por su identificador en la base del tercero
            // esto es debido a que si utilizo el email, SI O SI necesito la contraseña y la contraseña NO LA ENVIA NINGUN TERCERO (google)
            let user = await readByEmail(id)
            // si el usuario no es parte de la base de datos
            if (!user) {
                // lo crea/registra
                user = await create({ email: id, photo: picture, password: createHashUtil(id) })
            }
            // y luego inicia sesión "automaticamente"
            // req.session.role = user.role
            // req.session.user_id = user._id
            // los datos de la session se deben guardar en un token
            req.token = createTokenUtil({ role: user.role, user: user._id })
            // este done() agrega al objeto de requerimientos el objeto user con los datos del register/login user
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))

export default passport