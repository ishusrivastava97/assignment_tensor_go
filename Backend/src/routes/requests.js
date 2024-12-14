
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  createRequest,
  getRequestsByCategory,
} = require("../controllers/requestController");

router.post("/", auth, createRequest);
router.get("/:category", auth, getRequestsByCategory);

module.exports = router;
