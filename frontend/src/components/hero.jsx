import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>
          Making Cities
          <span> Smarter</span>
          <br />
          Together
        </h1>

        <p>
          CivicPulse is an AI-powered platform that empowers citizens to report
          civic issues such as potholes, garbage dumps, water leakage, and
          broken streetlights directly to local authorities with real-time
          tracking.
        </p>
        <div className="hero-buttons">

        <Link
        to="/register"
        className="primary-btn"
        >
        Report an Issue
        </Link>


        <a
        href="#features"
        className="secondary-btn"
        >
        Learn More
        </a>

        </div>
       

        <div className="hero-stats">
          <div>
            <h2>50K+</h2>
            <p>Issues Reported</p>
          </div>

          <div>
            <h2>95%</h2>
            <p>Resolution Rate</p>
          </div>

          <div>
            <h2>100+</h2>
            <p>Cities Connected</p>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900"
          alt="Smart City"
        />
      </div>
    </section>
  );
}

export default Hero;