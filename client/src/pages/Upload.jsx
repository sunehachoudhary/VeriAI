import { useState } from "react";
import axios from "axios";
function Upload() {

const [file,setFile]=useState(null);
const [result,setResult]=useState(null);
  
const handleUpload = async () => {

  if (!file) {
    alert("Select a file first");
    return;
  }

  const formData = new FormData();

  formData.append("file", file);

  try {

    const res = await axios.post(
      "http://localhost:5000/api/upload/analyze",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

   setResult(res.data);

  } catch (err) {

    console.log(err);

  }

};

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">

      <div className="bg-gray-900 p-10 rounded-2xl w-[500px]">

        <h1 className="text-white text-4xl font-bold mb-8">
          Upload Media
        </h1>

        <div className="border-2 border-dashed border-gray-600 p-10 rounded-xl text-center text-gray-400 mb-6">
          Drag & Drop Files Here
        </div>

        <input type="file" onChange={(e)=>
        setFile(e.target.files[0])
          }/>
          {file && <p>{file.name}</p>}

        <button onClick={handleUpload}>
          Analyze
        </button>

        {/*Result UI */}
        {result && (

<div className="mt-8 bg-gray-900 p-8 rounded-2xl text-white">

<h2 className="text-3xl font-bold mb-4">
Analysis Result
</h2>

<p>
Trust Score:
<span className="font-bold">
{result.trustScore}
</span>
</p>

<p className="mt-2">
Risk Level:
<span className="font-bold">
{result.riskLevel}
</span>
</p>

</div>

)}

      </div>

    </div>
  );
}

export default Upload;