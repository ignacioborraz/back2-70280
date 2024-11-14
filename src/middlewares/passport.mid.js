import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { create, readByEmail } from "../data/mongo/managers/users.manager.js"
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js"

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
            const one = await readByEmail(email)
            if (!one) {
                const error = new Error("INVALID CREDENTIALS")
                error.statusCode = 401
                return done(error)
            }
            const dbPassword = one.password
            const verify = verifyHashUtil(password, dbPassword)
            if (!verify) {
                const error = new Error("INVALID CREDENTIALS")
                error.statusCode = 401
                return done(error)
            }
            req.session.role = one.role
            req.session.user_id = one._id
            return done(null, one)
        } catch (error) {
            return done(error)
        }
    }
))

export default passport