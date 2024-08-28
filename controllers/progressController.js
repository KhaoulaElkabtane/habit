const Habit = require("../models/Habit");
const HabitTracking = require("../models/HabitTracking");

exports.logProgress = async (req, res) => {
  try {
    const habitTracking = new HabitTracking({
      habit: req.params.id,
      completed: req.body.completed,
    });
    await habitTracking.save();
    res.status(201).json(habitTracking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    const habitTrackings = await HabitTracking.find({
      habit: { $in: habits.map((h) => h._id) },
    });

    const summary = {
      totalHabits: habits.length,
      completedHabits: habitTrackings.filter((ht) => ht.completed).length,
      progress: calculateProgress(habits, habitTrackings),
    };

    res.status(200).json(summary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const calculateProgress = (habits, habitTrackings) => {
  return {
    streaks: habits.map((habit) => {
      const habitTrackingsForHabit = habitTrackings.filter((ht) =>
        ht.habit.equals(habit._id)
      );
      const streak = calculateStreak(habitTrackingsForHabit);
      return {
        habit: habit.name,
        streak,
        message: getMotivationalMessage(streak),
      };
    }),
  };
};

const calculateStreak = (habitTrackingsForHabit) => {
  return habitTrackingsForHabit.filter((ht) => ht.completed).length;
};

const getMotivationalMessage = (streak) => {
  if (streak >= 7)
    return "Great job! You’ve completed your habit for 7 days straight!";
  return "Keep going! You’re doing great!";
};
