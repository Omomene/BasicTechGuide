import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-links">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms">Terms & Conditions</Link>
        <Link to="/disclaimer">Disclaimer</Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>

      <p>
        © 2026 BasicTechGuide
      </p>
    </footer>
  );
}

export default Footer;