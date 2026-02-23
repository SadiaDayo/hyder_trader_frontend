import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { logoutAdmin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin-login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Admin Dashboard</h2>

      <p>Welcome Admin 🎉</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
