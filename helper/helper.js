
module.exports = {
    showValidationErrorResponse: (message) => {
        var resData = { "status": "failure", "statusCode": 403, "error_description": "Validation Error!", "message": (message) };
        return resData;
    },
    showErrorResponse: (message) => {
        var resData = { "status": "failure", "statusCode": 400, "error_description": "Validation Error!", "message": (message) };
        return resData;
    },

    showInternalServerErrorResponse: (message) => {
        var resData = { "status": "failure", "statusCode": 500, "error_description": "Internal Coding error or Params Undefined!", "message": message };
        return resData;
    },

    showUnathorizedErrorResponse: (message) => {
        var resData = { "status": "failure", "statusCode": 401, "error_description": "Invalid Login Credential!", "message": (message) };
        return resData;
    },

    showUnathorizedErrorResponseAccess: (message) => {
        var resData = { "status": "failure", "statusCode": 401, "error_code": 5011, "error_description": "You have not access for this!", "message": (message) };
        return resData;
    },

    showUnathorizedAppErrorResponse: (message) => {
        var resData = { "status": "failure", "statusCode": 200, "error_code": 5004, "error_description": "Unathorized Access!", "message": (message) };
        return resData;
    },

    showUnathorizedAppErrorWithErrorCode: (message, error_code) => {
        let resData = { "status": "failure", "statusCode": 200, "error_code": Number(error_code), "error_description": "Unathorized Access!", "message": (message) };
        return resData;
    },

    showDatabaseErrorResponse: (message, error) => {
        var resData = { "status": "failure", "statusCode": 502, "error_description": "Database error!", "message": (message), "error": error };
        return resData;
    },
    showSuccessResponse: (message, data) => {
        var resData = { "status": "success", "statusCode": 200, "message": (message), "data": data };
        return resData;
    },
    createResponse: (message, data) => {
        var resData = { "status": "success", "statusCode": 201, "message": (message), "data": data };
        return resData;
    },
}