const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode ? res.statusCode : 500

    let errMsg = err.message || 'Something went wrong';

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        errMsg = `Resource not found`;
    }
    res.status(statusCode)

    res.json({
        message: errMsg,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler
}