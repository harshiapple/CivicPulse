function Footer() {
  return (
    <footer id="contact" className="footer">

      <div className="footer-container">

        <div className="footer-column">
          <h2>CivicPulse</h2>

          <p>
            AI Powered Civic Issue Reporting Platform built for smarter cities
            and empowered citizens.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>

          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#stats">Statistics</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Support</h3>

          <ul>
            <li>Email</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>

          <p>support@civicpulse.com</p>

          <p>+91 9876543210</p>

          <p>India</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 CivicPulse. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;