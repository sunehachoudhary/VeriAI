import { useState, useEffect } from "react";
import axios from "axios";

function TextVerification() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await axios.get("http://localhost:5000/api/text/history");

      setHistory(res.data);
    };

    fetchHistory();
  }, []);

  const handleVerify = async () => {
    const res = await axios.post("http://localhost:5000/api/text/verify", {
      text,
    });

    setResult(res.data);

    // Refresh history
    const historyRes = await axios.get(
      "http://localhost:5000/api/text/history",
    );

    setHistory(historyRes.data);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl mb-6">Text Verification</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-60 p-4 text-black"
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
          <h2 className="text-2xl font-bold mb-4">Verification Result</h2>

          <p>
            Trust Score:
            <span className="font-bold ml-2">{result.trustScore}</span>
          </p>

          <p className="mt-2">
            Category:
            <span className="font-bold ml-2">{result.category}</span>
          </p>

          <p className="mt-3">{result.explanation}</p>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl mb-4">Previous Verifications</h2>

        {history.map((item) => (
          <div key={item._id} className="border p-4 mb-2 rounded">
            <p>{item.text}</p>

            <p>Trust: {item.trustScore}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextVerification;
