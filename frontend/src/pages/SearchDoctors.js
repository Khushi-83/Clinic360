import { useState } from "react";

const SearchDoctors = () => {
  const [filters, setFilters] = useState({ specialty: "", location: "", name: "" });
  const [doctors, setDoctors] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const searchDoctors = async () => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`http://localhost:5000/api/doctors/search?${query}`);
    const data = await response.json();
    setDoctors(data);
  };

  return (
    <div>
      <h2>Search Doctors</h2>
      <input type="text" name="specialty" placeholder="Specialty" onChange={handleChange} />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} />
      <input type="text" name="name" placeholder="Doctor's Name" onChange={handleChange} />
      <button onClick={searchDoctors}>Search</button>

      <ul>
        {doctors.map((doc) => (
          <li key={doc._id}>
            <a href={`/doctor/${doc._id}`}>{doc.name} - {doc.specialty} - {doc.location}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchDoctors;
