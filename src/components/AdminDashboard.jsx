import React from "react";
import CreateEVBunk from "../components/CreateEVBunk";
import ManageSlots from "../components/ManageSlots";

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <CreateEVBunk />
      <ManageSlots />
    </div>
  );
};

export default AdminDashboard;
