import { useState, useEffect } from "react";
import axios from "axios";

function TextVerification() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/text/history"
        );

        setHistory(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("History Error:", error);
        setHistory([]);
      }
    };

    fetchHistory();
  }, []);

  const handleVerify = async () => {
    if (!text.trim()) {
      alert("Please enter some text.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/text/verify",
        {
          text,
        }
      );

      setResult(res.data);

      // Refresh history
      const historyRes = await axios.get(
        "http://localhost:5000/api/text/history"
      );

      setHistory(
        Array.isArray(historyRes.data)
          ? historyRes.data
          : historyRes.data.history || []
      );
    } catch (error) {
      console.error("Verification Error:", error);
      console.error("Server Response:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Verification failed. Check the backend server."
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl mb-6">Text Verification</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-60 p-4 text-black rounded"
        placeholder="Paste text here..."
      />

      <button
        onClick={handleVerify}
        className="mt-4 bg-white text-black px-6 py-3 rounded"
      >
        Verify
      </button>

      {result && (
        <div className="mt-6 bg-gray-900 p-6 rounded-xl text-white">
          <h2 className="text-2xl font-bold mb-4">
            Verification Result
          </h2>

          <p>
            Trust Score:
            <span className="font-bold ml-2">
              {result.trustScore ?? "N/A"}
            </span>
          </p>

          <p>
            Category:
            <span className="ml-2">
              {result.category ?? "N/A"}
            </span>
          </p>

          <p>
            Confidence:
            <span className="ml-2">
              {result.confidence ?? "N/A"}%
            </span>
          </p>

          <p className="mt-2">
            Explanation:
            <span className="ml-2">
              {result.explanation ?? "No explanation available"}
            </span>
          </p>

          <div className="mt-4">
            <h3 className="font-bold mb-2">
              Detected Flags
            </h3>

            {Array.isArray(result.detectedFlags) &&
            result.detectedFlags.length > 0 ? (
              result.detectedFlags.map((flag, index) => (
                <p key={index}>• {flag}</p>
              ))
            ) : (
              <p>No flags detected.</p>
            )}
          </div>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl mb-4">
          Previous Verifications
        </h2>

        {history.length === 0 ? (
          <p>No verification history found.</p>
        ) : (
          history.map((item) => (
            <div
              key={item._id}
              className="border p-4 mb-2 rounded"
            >
              <p>{item.text}</p>

              <p>
                Trust Score: {item.trustScore}
              </p>

              {item.category && (
                <p>Category: {item.category}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TextVerification;