import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";


function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {

    if (!isLoggedIn()) {

      navigate("/login");

    }

  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        AI Analytics Dashboard
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

    </div>
  );
}

export default Dashboard;