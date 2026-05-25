function Upload() {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center">

      <div className="bg-gray-900 p-10 rounded-2xl w-[500px]">

        <h1 className="text-white text-4xl font-bold mb-8">
          Upload Media
        </h1>

        <div className="border-2 border-dashed border-gray-600 p-10 rounded-xl text-center text-gray-400 mb-6">
          Drag & Drop Files Here
        </div>

        <input
          type="file"
          className="text-white mb-6"
        />

        <button className="w-full bg-white text-black py-4 rounded-xl font-bold">
          Analyze with AI
        </button>

      </div>

    </div>
  );
}

export default Upload;