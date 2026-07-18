import { Link } from "react-router-dom";


function CTA() {

  return (

    <section className="cta">

      <div className="cta-content">

        <h2>
          Become a Part of a Smarter City
        </h2>


        <p>
          Every report you submit helps make your city cleaner,
          safer, and smarter. Join thousands of citizens using
          CivicPulse today.
        </p>



        <div className="cta-buttons">

          <Link
            to="/register"
            className="primary-btn"
          >
            Get Started
          </Link>


          <a
            href="#features"
            className="secondary-btn"
          >
            Learn More
          </a>

        </div>


      </div>


    </section>

  );

}

export default CTA;