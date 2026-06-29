import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  const [stats, setStats] = useState({
    totalScans: 0,
    avgTrust: 0,
    highRisk: 0,
  });

  // Check login
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch scan history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/upload/history",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (Array.isArray(res.data)) {
          setHistory(res.data);
        } else if (Array.isArray(res.data.history)) {
          setHistory(res.data.history);
        } else {
          setHistory([]);
        }
      } catch (error) {
        console.error(error);
        setHistory([]);
      }
    };

    fetchHistory();
  }, []);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setStats(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-4xl font-bold">
            {stats.totalScans}
          </h2>
          <p>Total Scans</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-4xl font-bold">
            {stats.avgTrust}%
          </h2>
          <p>Average Trust</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-4xl font-bold">
            {stats.highRisk}
          </h2>
          <p>High Risk</p>
        </div>

      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">
          Recent Scans
        </h2>

        {history.length === 0 ? (
          <p className="text-gray-400">
            No scan history found.
          </p>
        ) : (
          history.map((item) => (
            <div
              key={item._id}
              className="bg-gray-900 p-4 rounded-lg mb-4"
            >
              <p>
                <strong>File:</strong> {item.filename}
              </p>

              <p>
                <strong>Trust Score:</strong> {item.trustScore}
              </p>

              <p>
                <strong>Risk Level:</strong> {item.riskLevel}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;11
