import joi from "joi";
import ApiError from "../response-handler/api-error.js";
import ApiResponse from "../response-handler/api-response.js";

const loginSchema = joi.object({
  email: joi.string().min(4).email().required().messages({
    "string.empty": "name is required",
    "string.min": "name must be more than 4 character",
  }),
  password: joi
    .string()
    .min(4)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.empty": "name is required",
      "string.min": "name must be more than 4 character",
    }),
});

export const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new ApiError(
        400,
        "user schema not valid",
        error.details.map((err) => err.message),
        error,
      );
    }
    const response = new ApiResponse(200, value);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
