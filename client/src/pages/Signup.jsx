import { useState } from "react";
function Signup() {
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSignup = (e) => {
  e.preventDefault();

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  console.log("Signup Successful");

  console.log(name);
  console.log(email);
  console.log(password);
};
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

     <form
  onSubmit={handleSignup}
  className="bg-gray-900 p-10 rounded-2xl w-[400px] shadow-2xl"
>

        <h1 className="text-white text-4xl font-bold mb-8">
          Create Account
        </h1>

        <input
  type="text"
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full p-4 rounded-lg mb-4 bg-gray-800 text-white outline-none"
/>

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
  className="w-full bg-white text-black py-4 rounded-lg font-bold hover:opacity-90"
>
  Signup
</button>

     </form>

    </div>
  );
}

export default Signup;