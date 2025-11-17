import { connection } from "../config/db.config.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Error");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }

    const { user_name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await connection.query(
      "insert into users(user_name, email, password) values($1, $2, $3) returning *",
      [user_name, email, hashedPassword]
    );
    const user = result.rows[0];

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        success: true,
        message: "User registered successfully",
        user: { id: user.id, name: user.name, email: user.email },
      });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Error");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }

    const { email } = req.body;
    const result = await connection.query(
      "select * from users where email=$1",
      [email]
    );
    const user = result.rows[0];

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "LAX",
      })
      .json({
        success: true,
        message: "User LogedIn successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    res.status(200).clearCookie("token").json({
      success: true,
      message: "User LogedOut successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, logout };
