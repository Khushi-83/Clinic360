import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchDoctors from "../pages/SearchDoctors";
import DoctorProfile from "../pages/DoctorProfile";
import BookAppointment from "../pages/BookAppointment";
import PatientDashboard from "../pages/PatientDashboard";
import DoctorDashboard from "../pages/DoctorDashboard";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchDoctors />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/book/:id" element={<PrivateRoute role="patient"><BookAppointment /></PrivateRoute>} />
        <Route path="/dashboard/patient" element={<PrivateRoute role="patient"><PatientDashboard /></PrivateRoute>} />
        <Route path="/dashboard/doctor" element={<PrivateRoute role="doctor"><DoctorDashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
