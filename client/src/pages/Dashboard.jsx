function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        AI Analytics Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-8">

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h2 className="text-4xl font-bold">1,240</h2>
          <p className="text-gray-400 mt-2">Total Scans</p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h2 className="text-4xl font-bold">342</h2>
          <p className="text-gray-400 mt-2">AI Content</p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h2 className="text-4xl font-bold">91%</h2>
          <p className="text-gray-400 mt-2">Average Trust</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;