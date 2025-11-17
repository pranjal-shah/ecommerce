import { connection } from "../config/db.config.js";

const getAllUsers = async (req, res, next) => {
  try {
    const result = await connection.query(`select * from users where role = $1`, [
      "CUSTOMER",
    ]);

    const users = result.rows;

    res.status(200).json({
      success: true,
      message: "Get all users",
      users,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllUsers };
