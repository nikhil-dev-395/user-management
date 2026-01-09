class ApiError extends Error {
  constructor(statusCode, message, error = []) {
    super(message);
    this.status = "failed";
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.cause = cause;
    this.stack = stack;
  }
}

export default ApiError;
