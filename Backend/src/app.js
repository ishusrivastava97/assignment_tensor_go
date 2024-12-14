
require('dotenv').config();


const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");

const connectDB = require("./config/db");
require("./config/passport");

const authRoutes = require("./routes/auth");
const requestRoutes = require("./routes/requests");

const app = express();

app.use(cors({ origin: ["http://localhost:3001"], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({ secret: "yoursecret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/requests", requestRoutes);

connectDB();

app.listen(3000, () => console.log("Backend running on port 3000"));
