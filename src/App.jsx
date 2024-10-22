import { Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import AuthCheck from "./components/AuthCheck";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import ManageSlots from "./components/ManageSlots"; // Import ManageSlots
import SearchEVBunks from "./components/SearchEVBunk"; // Import SearchEVBunks

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/auth-check" element={<AuthCheck />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/manage-slots/:bunkId" element={<ManageSlots />} /> {/* Add this route */}
        <Route path="/search-ev-bunks" element={<SearchEVBunks />} /> {/* Route for SearchEVBunks */}
      </Routes>
    
  );
};

export default App;
