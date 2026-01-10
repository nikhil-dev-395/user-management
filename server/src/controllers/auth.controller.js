import bcrypt from "bcryptjs";
import { loginSchema } from "../validate-schema/index.js";
import { registerSchema } from "../validate-schema/register.schema.js";
import ApiError from "../response-handler/api-error.js";
import ApiResponse from "../response-handler/api-response.js";
import { User } from "../models/index.js";

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

    const { email, password } = value;
    const user = await User.findOne({ email }).lean();
    if (!user) throw new ApiError(404, "user not found");

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (passwordCompare !== true) {
      throw new ApiError(400, "incorrect password");
    }

    let info = {
      email: user.email,
      role: user.role,
      id: user._id,
    };
    req.session.user = info;
    const response = new ApiResponse(200, info);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body, {
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

    const { name, email, password } = value;
    const totalDoc = await User.countDocuments();
    const user = await User.findOne({ email }).lean();
    if (user) throw new ApiError(400, "user already exits");
    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = new User({
      name,
      email,
      password: hashPassword,
      role: totalDoc === 0 ? "Admin" : "User",
    });
    await createUser.save();
    let info = {
      role: createUser.role,
      id: createUser._id,
      email: createUser.email,
    };
    req.session.user = info;
    const response = new ApiResponse(200, info);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
