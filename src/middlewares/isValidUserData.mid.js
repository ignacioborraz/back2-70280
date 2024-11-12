function isValidUserData(req, res, next) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            const error = new Error("Enter email & password")
            error.statusCode = 400
            throw error
        }
        return next()
    } catch (error) {
        return next(error)
    }
}

export default isValidUserData