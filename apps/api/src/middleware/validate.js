import { ZodError } from "zod";
import { error as errorResponse } from "../utils/response.js";

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, 400, "Validation failed", error.errors);
    }
    next(error);
  }
};

export default validate;
