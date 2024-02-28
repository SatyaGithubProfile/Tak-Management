
module.exports = function (code, data, message) {
    // Define a function to generate API responses
    return {
        status: code,
        message: message,
        data: data
    };
}