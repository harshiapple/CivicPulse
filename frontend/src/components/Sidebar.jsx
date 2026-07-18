import {
  FaHome,
  FaPlusCircle,
  FaClipboardList,
  FaTrophy,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>CivicPulse</h2>
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/workspace" end>
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/workspace/report">
          <FaPlusCircle />
          <span>Report Issue</span>
        </NavLink>

        <NavLink to="/workspace/reports">
          <FaClipboardList />
          <span>My Reports</span>
        </NavLink>

        <NavLink to="/workspace/leaderboard">
          <FaTrophy />
          <span>Leaderboard</span>
        </NavLink>

        <NavLink to="/workspace/notifications">
          <FaBell />
                    <span>
            Notifications
          </span>

          <span className="nav-badge">
            2
          </span>
        </NavLink>

        <NavLink to="/workspace/profile">
          <FaUser />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/workspace/settings">
          <FaCog />
          <span>Settings</span>
        </NavLink>

      </nav>

      <div className="logout">

        <NavLink to="/">
          <FaSignOutAlt />
          <span>Logout</span>
        </NavLink>

      </div>
    </aside>
  );
}

export default Sidebar;