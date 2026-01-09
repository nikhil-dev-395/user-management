class ApiResponse {
  constructor(statusCode, message) {
    this.status = statusCode < 400 ? "success" : "failed";
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default ApiResponse;
