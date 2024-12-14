const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  createToken,
  localSignup,
  localLogin,
} = require("../controllers/authController");


router.post("/signup", localSignup);
router.post("/login", localLogin);


router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3001/login",
  }),
  createToken
);

module.exports = router;
