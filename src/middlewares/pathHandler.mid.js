function pathHandler(req, res, next) {
    const message = req.method + " " + req.url + " - ENDPOINT NOT FOUND"
    const statusCode = 404
    return res.status(statusCode).json({ message })
}

export default pathHandler