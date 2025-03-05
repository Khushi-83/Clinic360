import React from "react";
import AppRoute from "./routes/AppRoute";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  console.log("App component loaded!");

  return (
    <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <AppRoute />
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;