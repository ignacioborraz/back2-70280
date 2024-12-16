function errorHandler(error, req, res, next) {
    console.log(error);
    const message = req.method + " " + req.url + " - " + (error.message || "API ERROR")
    const statusCode = error.statusCode || 500
    return res.status(statusCode).json({ message })
}

export default errorHandler