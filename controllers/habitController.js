const Habit = require("../models/Habit");

exports.createHabit = async (req, res) => {
  try {
    const habit = new Habit({
      name: req.body.name,
      frequency: req.body.frequency,
      goals: req.body.goals,
      user: req.user.id,
    });
    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.status(200).json(habits);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
