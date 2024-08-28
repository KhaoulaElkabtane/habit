import { useEffect, useState } from "react";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/progress/dashboard",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!summary)
    return <div className="text-white text-center p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Progress Dashboard
      </h2>
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 p-4 rounded-md bg-purple-900 text-2xl flex justify-center gap-5 py-8">
            <span className="pt-4">Total Habits</span>{" "}
            <span className="text-[3em] font-bold">{summary.totalHabits}</span>
          </div>
          <div className="flex-1 p-4 rounded-md bg-purple-900 text-2xl flex justify-center gap-5 py-8">
            <span className="pt-4">Completed Habits</span>{" "}
            <span className="text-[3em] font-bold">
              {summary.completedHabits}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {summary.progress.streaks.map((streak) => (
            <div key={streak.habit} className="bg-gray-800 p-4 rounded-md">
              <div className="flex justify-between">
                <h4 className="text-xl font-semibold text-white">Habit: {streak.habit}</h4>
                <span className="text-xl text-purple-600">
                  {streak.streak}
                  <i class="uil uil-fire"></i>
                </span>
              </div>
              <p className="text-gray-300">{streak.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
