import { FaBell, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Topbar() {

  return (
    <header className="topbar">

      <div>

        <h2>
          Welcome Back 👋
        </h2>

        <p>
          Let's build a smarter city today.
        </p>

      </div>


      <div className="topbar-right">


        <Link
          to="/workspace/notifications"
          className="notification-btn"
        >
          <FaBell />
        </Link>


        <Link
          to="/workspace/profile"
          className="user-avatar"
        >
          <FaUser />
        </Link>


      </div>


    </header>
  );
}

export default Topbar;