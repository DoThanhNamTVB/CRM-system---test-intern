const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req?.originalUrl || null}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message;
    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invaild data type';
    }
    res.status(statusCode).json({
        message: message,
        stack: err.stack
    });
    next(err);
};

module.exports = {
    notFound,
    errorHandler
};
