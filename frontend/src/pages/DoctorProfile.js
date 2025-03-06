import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => setDoctor(data));
  }, [id]);

  if (!doctor) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{doctor.name}</h2>
      <p>Specialty: {doctor.specialty}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>Location: {doctor.location}</p>
      <h3>Availability:</h3>
      <ul>
        {doctor.availability.map((slot, index) => (
          <li key={index}>{slot.day} - {slot.time}</li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorProfile;
