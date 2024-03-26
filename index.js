const express = require("express");
const app = express();
const mongoose = require("mongoose");
const env = require("dotenv").config();
const port = process.env.PORT || 2200;
const helmet = require("helmet");
const cors = require("cors")

const connectDb = require("./db/db");
const Router = require("./Router/userRouter");
const adminRouter = require("./Router/adminRouter");
const profileRouter = require("./Router/profileRouter");

app.use(helmet())

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectDb();

app.use(express.json());

app.use("/api/v1", Router)

app.use("/admin", adminRouter)

app.use("/api", profileRouter)


app.get("/", (req, res) => {
  res.send("homePage");
});

app.listen(port, () => {
  console.log(`app is listening on http://localhost${port}`);
});
