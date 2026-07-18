import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { loginUser } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate())
        return;

    try {

        const response = await loginUser(formData);

        console.log("LOGIN RESPONSE");
        console.log(response);
        console.log(response.data);

       localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        localStorage.setItem("email", response.email);

        if (response.role === "ADMIN") {

            navigate("/admin");

        } else {

            navigate("/workspace");

        }
    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Invalid email or password"
        );

    }

    };

    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
   };

    const validate = () => {

        let temp = {};

        if (!formData.email.trim())
            temp.email = "Email is required.";

        if (!formData.password)
            temp.password = "Password is required.";

        setErrors(temp);

        return Object.keys(temp).length === 0;

    };


    return (

        <div className="login-container">

            <div className="login-left">

                <div className="login-content">

                    <h1>Welcome Back 👋</h1>

                    <p>
                        Login to continue using CivicPulse.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />

                            {errors.email &&
                                <p className="error">
                                    {errors.email}
                                </p>}

                        </div>

                        <div className="input-group">

                            <label>Password</label>

                            <div className="password-box">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                />

                                <button
                                    type="button"
                                    className="show-btn"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                            {errors.password &&
                                <p className="error">
                                    {errors.password}
                                </p>}

                        </div>

                        <button className="login-submit">

                            Login

                        </button>

                    </form>

                    <p className="register-link">

                        Don't have an account?

                        <Link to="/register">

                            Register

                        </Link>

                    </p>

                </div>

            </div>

            <div className="login-right">

                <div className="overlay">

                    <h2>CivicPulse</h2>

                    <p>

                        Smarter Cities Start With You.

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;