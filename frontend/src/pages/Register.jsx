import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
});
const handleChange = (e) => {

    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

};
const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {

        alert("Passwords do not match");

        return;

    }

    try {

        const response = await registerUser({

            name: formData.name,
            email: formData.email,
            password: formData.password

        });

        alert(response);

        navigate("/login");

    }

    catch(error){

        console.log(error.response);

        alert(
            error.response?.data ||
            "Registration failed"
        );

    }

};

  return (
    <div className="register-container">

      <div className="register-left">

        <div className="register-content">

          <h1>Create Account 🚀</h1>

          <p>
            Join CivicPulse and help build cleaner, safer and smarter cities.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
            />
            </div>

            <div className="input-group">
              <label>Email</label>
            <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="Enter your email"
/>
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="password-box">
<input
    type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleChange}
/>

                <button
                  type="button"
                  className="show-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label>Confirm Password</label>

              <div className="password-box">
<input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    value={formData.confirmPassword}
    onChange={handleChange}
/>

                <button
                  type="button"
                  className="show-btn"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button className="register-submit">
              Create Account
            </button>

          </form>

          <p className="login-link">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </div>

      </div>

      <div className="register-right">

        <div className="overlay">

          <h2>Welcome to CivicPulse</h2>

          <p>
            Report issues, earn rewards, and make your city a better place.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;