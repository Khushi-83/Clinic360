import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("patient");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    speciality: "",
    experience: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }

    const body = { ...formData, role };

    try {
      const response = await fetch("https://clinic360-7rgl.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Register as a {role}</h2>

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
        <input type="text" placeholder="Full Name" className="w-full p-2 mb-2 border" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="number" placeholder="Age" className="w-full p-2 mb-2 border" required onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
        <input type="text" placeholder="Location" className="w-full p-2 mb-2 border" required onChange={(e) => setFormData({ ...formData, location: e.target.value })} />

        {role === "patient" && (
          <>
            <select className="w-full p-2 mb-2 border" required onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input type="text" placeholder="Phone Number" className="w-full p-2 mb-2 border" required onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          </>
        )}

        {role === "doctor" && (
          <>
            <input type="text" placeholder="Speciality" className="w-full p-2 mb-2 border" required onChange={(e) => setFormData({ ...formData, speciality: e.target.value })} />
            <input type="number" placeholder="Years of Experience" className="w-full p-2 mb-2 border" required onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
            <input type="text" placeholder="Phone Number" className="w-full p-2 mb-2 border" required onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          </>
        )}

        <input type="email" placeholder="Email" className="w-full p-2 mb-2 border" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full p-2 mb-2 border" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <input type="password" placeholder="Confirm Password" className="w-full p-2 mb-2 border" required onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
      </form>

      <p className="mt-4">
        Already have an account? <a href="/login" className="text-blue-500">Login</a>
      </p>
    </div>
  );
};

export default Register;
