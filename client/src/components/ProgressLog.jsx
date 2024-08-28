import { useState, useEffect } from "react";

const ProgressLog = () => {
  const [habits, setHabits] = useState([]);
  const [habitId, setHabitId] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/habits", {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setHabits(data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    fetchHabits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/progress/${habitId}/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ completed }),
      });
      setHabitId("");
      setCompleted(false);
    } catch (error) {
      console.error("Error logging progress:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto  shadow-lg rounded-lg">
      {habits.length === 0 ? (
        <p className="text-gray-500 text-center">
          You have no habits for the moment.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Habit:
              <select
                value={habitId}
                onChange={(e) => setHabitId(e.target.value)}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2"
              >
                <option value="">Select Habit</option>
                {habits.map((habit) => (
                  <option key={habit._id} value={habit._id}>
                    {habit.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => setCompleted(!completed)}
              id="completed"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="completed"
              className="text-sm font-medium"
            >
              Completed
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log Progress
          </button>
        </form>
      )}
    </div>
  );
};

export default ProgressLog;
