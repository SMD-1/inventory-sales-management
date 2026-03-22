import { error as errorResponse } from "../utils/response.js";

const notFound = (req, res, next) => {
  return errorResponse(res, 404, `Not Found - ${req.originalUrl}`);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return errorResponse(res, statusCode, err.message || "Server error");
};

export { notFound, errorHandler };
