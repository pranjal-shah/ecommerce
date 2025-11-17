import { body, query, param } from "express-validator";
import bcrypt from "bcryptjs";
import { connection } from "../config/db.config.js";

export const registerValidator = [
  body("user_name").trim().notEmpty().withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .custom(async (email) => {
      const existing = await connection.query(
        "select * from users where email=$1",
        [email]
      );
      if (existing.rows.length > 0) {
        throw new Error("Email already in use");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (password, { req }) => {
      const { email } = req.body;
      const result = await connection.query(
        "select * from users where email=$1",
        [email]
      );
      if (result.rowCount === 0) {
        throw new Error("Invalid email or password");
      } else {
        const isValidPassword = await bcrypt.compare(
          password,
          result.rows[0].password
        );
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }
      }
      return true;
    }),
];
