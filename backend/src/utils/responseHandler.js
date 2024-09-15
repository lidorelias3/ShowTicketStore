const handleResponse = (res, statusCode, success, message, detailes = null) => {
    res.status(statusCode).json({
        success,
        message,
        detailes
    });
};

module.exports = handleResponse;
