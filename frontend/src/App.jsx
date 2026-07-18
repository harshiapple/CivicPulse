import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import CitizenLayout from "./layouts/CitizenLayout";
import CitizenWorkspace from "./pages/CitizenWorkspace";
import ReportIssue from "./pages/ReportIssue";
import MyReports from "./pages/MyReports";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import ReportDetails from "./pages/ReportDetails";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/workspace" element={<CitizenLayout />}>
      

        <Route
          index
          element={<CitizenWorkspace />}
        />
        <Route path="report" element={<ReportIssue />} />
        <Route path="reports" element={<MyReports />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="profile" element={<Profile />} />
            <Route
        path="settings"
        element={<Settings />}
    />
      <Route path="notifications" element={<Notifications />} />

         <Route
        path="reports/:id"
        element={<ReportDetails />}
    />
      </Route>
      <Route path="admin" element={<AdminDashboard />} />

    </Routes>
  );
}

export default App;