import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [locations, setLocations] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("https://clinic360-7rgl.onrender.com", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setDoctor(data.doctor);
          setLocations(data.locations);
          setAvailability(data.availability);
          setAppointments(data.appointments);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [navigate]);

  const handleLocationAdd = async (newLocation) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("https://clinic360-7rgl.onrender/api/doctor/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location: newLocation }),
      });

      if (res.ok) {
        setLocations([...locations, newLocation]);
      } else {
        console.error("Failed to add location");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAvailabilityUpdate = async (newAvailability) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("https://clinic360-7rgl.onrender/api/doctor/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ availability: newAvailability }),
      });

      if (res.ok) {
        setAvailability(newAvailability);
      } else {
        console.error("Failed to update availability");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>

      {doctor && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p><strong>Name:</strong> {doctor.name}</p>
          <p><strong>Speciality:</strong> {doctor.speciality}</p>
          <p><strong>Experience:</strong> {doctor.experience} years</p>
        </div>
      )}

      {/* Consultation Locations */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Consultation Locations</h2>
        <ul className="list-disc ml-6">
          {locations.map((loc, index) => <li key={index}>{loc}</li>)}
        </ul>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={() => handleLocationAdd(prompt("Enter new location:"))}
        >
          Add Location
        </button>
      </div>

      {/* Availability */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Availability</h2>
        <p>{availability.join(", ") || "No availability set"}</p>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          onClick={() =>
            handleAvailabilityUpdate(prompt("Enter availability (e.g. Mon-Fri 10AM-3PM):").split(","))
          }
        >
          Update Availability
        </button>
      </div>

      {/* Upcoming Appointments */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
        {appointments.length > 0 ? (
          <ul className="list-disc ml-6">
            {appointments.map((appt, index) => (
              <li key={index}>
                {appt.patientName} - {appt.date} at {appt.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming appointments</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
