import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import HabitForm from "../components/HabitForm";
import ProgressLog from "../components/ProgressLog";
import Dashboard from "../components/Dashboard";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const [activePage, setActivePage] = useState("create");
    const navigate = useNavigate();
  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Layout>
      <div className="h-full overflow-y-scroll w-full">
        <div className="h-screen bg-cover bg-center relative bg-no-repeat">
          <div className="inline-flex items-center justify-center p-4 bg-transparent w-full">
            <div className="w-full">
              <div className="bg-black/40 backdrop-blur-3xl z-10 p-6 relative w-full border-t-4 border-blue-600 rounded-lg">
                <nav className="flex pb-3">
                  <button
                    className={`flex-1 py-2 ${
                      activePage == "create"
                        ? "border-b-2 border-blue-800 bg-purple-500 bg-opacity-20"
                        : ""
                    }`}
                    onClick={() => setActivePage("create")}
                  >
                    Create
                  </button>
                  <button
                    className={`flex-1 py-2 ${
                      activePage == "progress"
                        ? "border-b-2 border-blue-800 bg-purple-500 bg-opacity-20"
                        : ""
                    }`}
                    onClick={() => setActivePage("progress")}
                  >
                    Progress Log
                  </button>
                  <button
                    className={`flex-1 py-2 ${
                      activePage == "dashboard"
                        ? "border-b-2 border-blue-800 bg-purple-500 bg-opacity-20"
                        : ""
                    }`}
                    onClick={() => setActivePage("dashboard")}
                  >
                    Dashboard
                  </button>
                </nav>

                {activePage == "create" && <HabitForm />}
                {activePage == "progress" && <ProgressLog />}
                {activePage == "dashboard" && <Dashboard />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
