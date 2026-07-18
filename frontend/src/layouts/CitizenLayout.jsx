import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import "../styles/workspace.css";

function CitizenLayout() {
  return (
    <div className="workspace">

      <Sidebar />

      <div className="workspace-main">

        <Topbar />

        <main className="workspace-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default CitizenLayout;