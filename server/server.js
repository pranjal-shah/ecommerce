import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import dbConfig from "./config/db.config.js";

import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import userRouter from "./routes/user.route.js";

import loggerMiddleware from "./middlewares/logger.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import unknownRoutesMiddleware from "./middlewares/404.middleware.js";
import isAuthenticated from "./middlewares/auth.middleware.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: "*",
  },
});
io.on("connection", (socket) => {
  console.log("user Connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("user Disconnected: ", socket.id);
  });

  socket.on("add-cart", (notificationCount) => {
    const newCount = notificationCount + 1;
    io.to(socket.id).emit("cart-updated", newCount);
  });
});

dotenv.config();

dbConfig();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(loggerMiddleware);

app.use("/api/auth", authRouter);
app.use("/api/user", isAuthenticated, userRouter);
app.use("/api/product", isAuthenticated, productRouter);
app.use("/api/cart", isAuthenticated, cartRouter);

app.use(unknownRoutesMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
