const express = require("express");
const router = express.Router();
const { createHabit, getHabits } = require("../controllers/habitController");
const auth = require("../middleware/auth");

router.post("/", [auth], createHabit);
router.get("/", [auth], getHabits);

module.exports = router;
