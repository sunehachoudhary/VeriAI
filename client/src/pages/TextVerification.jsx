import { useState, useEffect } from "react";
import axios from "axios";

function TextVerification() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/text/history"
      );

      setHistory(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleVerify = async () => {
    if (!text.trim()) {
      alert("Please enter some text.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/verify",
        {
          text,
        }
      );

      setResult(res.data);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        AI Text Verification
      </h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-60 p-4 rounded text-black"
        placeholder="Paste text here..."
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="mt-6 bg-white text-black px-6 py-3 rounded"
      >
        {loading ? "Analyzing..." : "Verify"}
      </button>

      {result && (

        <div className="mt-8 bg-gray-900 p-6 rounded-xl">

          <h2 className="text-3xl font-bold mb-6">
            Verification Result
          </h2>

          <p className="mb-2">
            <strong>Trust Score:</strong>{" "}
            {result.trustScore}
          </p>

          <p className="mb-2">
            <strong>Risk Level:</strong>{" "}
            {result.riskLevel}
          </p>

          <p className="mb-2">
            <strong>Confidence:</strong>{" "}
            {result.confidence}%
          </p>

          <div className="mt-4">

            <h3 className="text-xl font-bold">
              Summary
            </h3>

            <p className="mt-2">
              {result.summary}
            </p>

          </div>

          <div className="mt-6">

            <h3 className="text-xl font-bold">
              Red Flags
            </h3>

            {result.redFlags &&
            result.redFlags.length > 0 ? (

              result.redFlags.map((flag, index) => (

                <p key={index}>
                  ⚠️ {flag}
                </p>

              ))

            ) : (

              <p>No red flags detected.</p>

            )}

          </div>

          <div className="mt-6">

            <h3 className="text-xl font-bold">
              Recommendations
            </h3>

            {result.recommendations &&
            result.recommendations.length > 0 ? (

              result.recommendations.map(
                (item, index) => (

                  <p key={index}>
                    ✅ {item}
                  </p>

                )
              )

            ) : (

              <p>No recommendations.</p>

            )}

          </div>

        </div>

      )}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6">
          Previous Verifications
        </h2>

        {history.length === 0 ? (

          <p>No verification history found.</p>

        ) : (

          history.map((item) => (

            <div
              key={item._id}
              className="bg-gray-900 rounded-lg p-5 mb-5"
            >

              <p>
                <strong>Text:</strong>
              </p>

              <p className="mb-4">
                {item.text}
              </p>

              <p>
                <strong>Trust Score:</strong>{" "}
                {item.trustScore}
              </p>

              {item.riskLevel && (

                <p>
                  <strong>Risk Level:</strong>{" "}
                  {item.riskLevel}
                </p>

              )}

              {item.confidence && (

                <p>
                  <strong>Confidence:</strong>{" "}
                  {item.confidence}%
                </p>

              )}

              {item.summary && (

                <p className="mt-3">
                  <strong>Summary:</strong>
                  <br />
                  {item.summary}
                </p>

              )}

              {item.createdAt && (

                <p className="mt-4 text-sm text-gray-400">
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </p>

              )}

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default TextVerification;