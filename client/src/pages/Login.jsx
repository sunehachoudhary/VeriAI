import axios from "axios";

import { useState } from "react";
function Login() {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  const [loading, setLoading] = useState(false);
  
 const handleLogin = async (e) => {
  e.preventDefault();

   
   
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    console.log("LOGIN RESPONSE:", response.data);// ✅ FIXED

    localStorage.setItem(
      "token",
      response.data.token
    );

    alert("Login Successful");

    window.location.href = "/dashboard";

  } catch (error) {
    console.log(error);
    alert(
      error.response?.data?.message ||
      "Login Failed"
    );
  } finally {
    setLoading(false); // ✅ always reset loading
  }
};
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

     <form
  onSubmit={handleLogin}
  className="bg-gray-900 p-10 rounded-2xl w-[400px] shadow-2xl"
>

        <h1 className="text-white text-4xl font-bold mb-8">
          Welcome Back
        </h1>

      <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full p-4 rounded-lg mb-4 bg-gray-800 text-white outline-none"
/>

        <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-4 rounded-lg mb-6 bg-gray-800 text-white outline-none"
/>

        <button
  type="submit"
  disabled={loading}
  className="w-full bg-white text-black py-4 rounded-lg font-bold hover:opacity-90"
>
  {loading ? "Logging in..." : "Login"}
</button>

      </form>

    </div>
  );
}

export default Login;