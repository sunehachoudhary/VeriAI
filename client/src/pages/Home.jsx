import Button from "../components/Button";
function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center text-center px-6">

      <h1 className="text-6xl font-bold mb-6">
        Verify Digital Trust with AI
      </h1>

      <p className="text-gray-400 text-xl max-w-2xl mb-8">
        Detect AI-generated content, fake news, deepfakes,
        and suspicious media using advanced AI analysis.
      </p>

      <Button text="Start Scanning"/>

    </div>
  );
}

export default Home;