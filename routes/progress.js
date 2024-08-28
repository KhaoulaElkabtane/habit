const express = require("express");
const router = express.Router();
const {
  logProgress,
  getDashboard,
} = require("../controllers/progressController");
const auth = require("../middleware/auth");

router.post("/:id/progress",[auth], logProgress);
router.get("/dashboard",[auth], getDashboard);

module.exports = router;
