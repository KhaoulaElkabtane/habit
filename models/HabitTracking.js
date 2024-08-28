const mongoose = require("mongoose");

const habitTrackingSchema = new mongoose.Schema({
  habit: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
  date: { type: Date, default: Date.now },
  completed: { type: Boolean, required: true },
});

module.exports = mongoose.model("HabitTracking", habitTrackingSchema);
