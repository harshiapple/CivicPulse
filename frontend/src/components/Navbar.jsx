import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Civic<span>Pulse</span>
      </div>

      <ul className="nav-links">
        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <a href="#how">How It Works</a>
        </li>

        <li>
          <a href="#stats">Statistics</a>
        </li>

        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <div className="buttons">
        <Link to="/login" className="login-btn">
          Login
        </Link>

        <Link to="/register" className="register-btn">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;