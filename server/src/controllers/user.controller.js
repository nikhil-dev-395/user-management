/**
 *  crud operation on users
 *
 * **/
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import ApiResponse from "../response-handler/api-response.js";

import {
  userSchema,
  getUserSchema,
  updateUserSchema,
} from "../validate-schema/index.js";
import ApiError from "../response-handler/api-error.js";
import logger from "../utils/logger.utils.js";
import env from "../config/env.js";

export const createUser = async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new ApiError(
        400,
        "invalid user details",
        error.details.map((err) => err.message),
        error,
      );
    }

    const { name, email, password } = value;
    const user = await User.findOne({ email }).lean();
    if (user) throw new ApiError(409, "user already exits", [], error);

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();

    const data = {
      name,
      email,
    };

    const response = new ApiResponse(201, "user created successfully", data);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { email } = req.params;
    if (!email) throw new ApiError(400, "email not provided");
    const user = await User.findOne({ email }).lean();
    logger.info({ user }, "user found");
    if (!user) throw new ApiError(409, "user not found");
    delete user.password;
    if (env.NODE_ENV === "production") delete user._id;
    delete user.__v;

    const response = new ApiResponse(200, "user found", user);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!_id) throw new ApiError(400, "user id not provided");
    const { error, value } = updateUserSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new ApiError(
        400,
        "invalid data",
        error.details.map((err) => err.message),
        error,
      );
    }
    let { name, email, password, status } = value;
    const hashPassword = await bcrypt.hash(password, 10);

    let user = await User.findOneAndUpdate(
      { _id },
      {
        $set: {
          name,
          email,
          password: hashPassword,
          status,
        },
      },
      { new: true },
    ).lean();
    if (!user) throw new ApiError(409, "user not found", [], error);
    const data = user;
    const response = new ApiResponse(200, "user found", data);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.params;
    if (!email) throw new ApiError(400, "email not provided");
    const user = await User.findOne({ email }).lean();
    if (!user) throw new ApiError(409, "user not found");
    await User.deleteOne({ email });
    const response = new ApiResponse(200, "user deleted successfully");
    return res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
