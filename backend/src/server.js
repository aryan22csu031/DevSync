const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connect_db = require("./config/database");
const authRouter = require("./routes/authRoutes");
const profileRouter = require("./routes/profileRoutes");
const requestRouter = require("./routes/requestRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connect_db()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
