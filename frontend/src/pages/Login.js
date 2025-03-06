import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("patient");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      localStorage.setItem("token", data.token);
      navigate(role === "doctor" ? "/dashboard/doctor" : "/dashboard/patient");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Login as {role}</h2>

      <div className="flex space-x-4 mb-4">
        <button className={`px-4 py-2 ${role === "patient" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setRole("patient")}>
          Patient
        </button>
        <button className={`px-4 py-2 ${role === "doctor" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setRole("doctor")}>
          Doctor
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-96">
        <input type="email" placeholder="Email" className="w-full p-2 mb-2 border" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full p-2 mb-2 border" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
      </form>

      <p className="mt-4">
        Don't have an account? <a href="/register" className="text-blue-500">Register</a>
      </p>
    </div>
  );
};

export default Login;
