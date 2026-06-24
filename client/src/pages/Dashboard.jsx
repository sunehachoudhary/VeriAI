import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

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

        console.log("History Response:", res.data);

        // If backend returns an array directly
        if (Array.isArray(res.data)) {
          setHistory(res.data);
        }

        // If backend returns { history: [...] }
        else if (Array.isArray(res.data.history)) {
          setHistory(res.data.history);
        }

        // Fallback
        else {
          setHistory([]);
        }
      } catch (error) {
        console.error("History fetch error:", error);
        setHistory([]);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-4xl font-bold">120</h2>
          <p>Total Scans</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-4xl font-bold">84%</h2>
          <p>Avg Trust</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-4xl font-bold">7</h2>
          <p>High Risk</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Recent Scans</h2>

        {history.length === 0 ? (
          <p className="text-gray-400">No scan history found.</p>
        ) : (
          history.map((item) => (
            <div
              key={item._id}
              className="bg-gray-900 p-4 rounded-lg mb-4"
            >
              <p>{item.filename}</p>

              <p>
                Trust Score: {item.trustScore ?? "N/A"}
              </p>

              <p>
                Risk: {item.riskLevel ?? "N/A"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;