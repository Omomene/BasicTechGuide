import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms">Terms & Conditions</Link>
        <Link to="/disclaimer">Disclaimer</Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>

      <div className="footer-copy">
        © 2026 BasicTechGuide
      </div>
    </footer>
  );
}

export default Footer;