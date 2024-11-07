import e, { Router } from "express";

const cookiesRouter = Router()

cookiesRouter.get("/create", (req, res, next)=> {
    try {
        const message = 'COOKIE SETEADA'
        // para setear/crear una cookie necesito enviar el par clave/valor de la cookie en el objeto de respuesta con el metodo cookie
        // para la modificacion de una cookie, se sobre-escribe la misma con el mismo método de creación de cookie
        return res
            // primero se manda el codigo de estado
            .status(201)
            // luego las cookies
            .cookie("modo","oscuro")
            .cookie("rolDeUsuario","admin",{ maxAge: 20000 })
            // por ultimo el tipo de respuesta con la informacion que se necesite enviar
            .json({ message })
    } catch (error) {
        return next(error)
    }
})

cookiesRouter.get("/read", (req, res, next)=> {
    try {
        const cookies = req.cookies
        console.log(cookies);        
        console.log(cookies["modo"]);
        console.log(cookies.modo);
        const message = "COOKIE LEIDA"
        return res.status(200).json({ message })
    } catch (error) {
        return next(error)
    }
})

cookiesRouter.get("/destroy/:cookieAborrar", (req, res, next)=> {
    try {
        const { cookieAborrar } = req.params
        // asi como la creacion de una cookie se hace en el objeto de respuesta a enviar al cliente
        // la eliminacion de una cookie se hace desde el objeto de respuesta
        const message = "COOKIE DESTROYED"
        return res
            .status(200)
            // con el método para borrar la cookie tienen que indicar QUE cookie desean borrar
            .clearCookie(cookieAborrar)
            .json({ message })
    } catch (error) {
        return next(error)
    }
})

cookiesRouter.get("/signed", (req, res, next)=> {
    try {
        const message = "COOKIE FIRMADA CREADA"
        return res.status(201).cookie("nombre","igna",{ signed: true }).json({ message })
    } catch (error) {
        return next(error)
    }
})

cookiesRouter.get("/read-signed", (req, res, next)=> {
    try {
        const cookies = req.cookies
        const signedCookies = req.signedCookies
        return res.status(200).json({ cookies, signedCookies })
    } catch (error) {
        return next(error)
    }
})

export default cookiesRouter