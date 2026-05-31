import { Link } from "react-router-dom";

import { logout } from "../utils/auth";

function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      
      <h1 className="text-2xl font-bold">
        VeriAI
      </h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>

        <Link to="/login">Login</Link>

        <Link to="/signup">Signup</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/upload">Upload</Link>
      </div>

      <button
onClick={()=>{
logout();
window.location.href="/login";
}}
>
Logout
</button>

    </nav>
  );
}

export default Navbar;