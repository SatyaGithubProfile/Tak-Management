
module.exports = function (code, message, data, count = 0) {
    // Define a function to generate API responses
    return {
        status: code,
        message: message,
        data: data,
        count : count
    };
}