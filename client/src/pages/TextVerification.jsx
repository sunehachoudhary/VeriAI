import { useState } from "react";
import axios from "axios";

function TextVerification() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    const res = await axios.post("http://localhost:5000/api/text/verify", {
      text,
    });

    setResult(res.data);
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

      {result && <div className="mt-4">Trust Score: {result.trustScore}</div>}
    </div>
  );
}

export default TextVerification;
