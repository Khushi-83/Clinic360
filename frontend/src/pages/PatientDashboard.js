import { useState, useEffect } from "react";
import axios from "axios";

export default function PatientsDashboard() {
    const [doctors, setDoctors] = useState([]);
    const [filters, setFilters] = useState({ specialty: "", location: "", name: "" });

    // 🏥 Fetch Doctors based on filters
    const fetchDoctors = async () => {
        const response = await axios.get(`/api/doctors/search`, { params: filters });
        setDoctors(response.data);
    };

    useEffect(() => { fetchDoctors(); }, [filters]);

    return (
        <div className="p-6">
            {/* Filters Section */}
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by Name"
                    className="p-2 border rounded"
                    onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Search by Location"
                    className="p-2 border rounded"
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
                <select
                    className="p-2 border rounded"
                    onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
                >
                    <option value="">Select Specialty</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Neurologist">Neurologist</option>
                </select>
            </div>

            {/* Doctors List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {doctors.map((doctor) => (
                    <div key={doctor._id} className="border p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{doctor.name}</h2>
                        <p className="text-gray-600">{doctor.specialty}</p>
                        <p className="text-gray-600">{doctor.location}</p>
                        <a href={`/doctor/${doctor._id}`} className="text-blue-500">View Profile</a>
                    </div>
                ))}
            </div>
        </div>
    );
}
