
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { useEffect, useState } from "react";
import axios from "axios";


function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {
  if (!isLoggedIn()) {
    navigate("/login");
  }
}, [navigate]);
  const [history,setHistory] = useState([]);

  useEffect(() => {

  const fetchHistory = async () => {

    const res =
      await axios.get(
        "http://localhost:5000/api/upload/history"
      );

    setHistory(res.data);
  };

  fetchHistory();

}, []);
  
  return (
  <div className="p-10 text-white">

    <h1 className="text-4xl mb-8">
      Dashboard
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="bg-gray-900 p-6 rounded-xl">
        <h2 className="text-4xl font-bold">
          120
        </h2>
        <p>Total Scans</p>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl">
        <h2 className="text-4xl font-bold">
          84%
        </h2>
        <p>Avg Trust</p>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl">
        <h2 className="text-4xl font-bold">
          7
        </h2>
        <p>High Risk</p>
      </div>

    </div>

    {/* ADD THIS WHOLE BLOCK BELOW */}

    <div className="mt-10">

      <h2 className="text-3xl font-bold mb-6">
        Recent Scans
      </h2>

      {history.map((item) => (

        <div
          key={item._id}
          className="bg-gray-900 p-4 rounded-lg mb-4"
        >

          <p>
            {item.filename}
          </p>

          <p>
            Trust Score: {item.trustScore}
          </p>

          <p>
            Risk: {item.riskLevel}
          </p>

        </div>

      ))}

    </div>

  </div>
);
}

export default Dashboard;