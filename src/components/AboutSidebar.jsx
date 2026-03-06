import { NavLink } from "react-router-dom";

function AboutSidebar() {
  return (
    <div id="sidebar">
            <p>Simple pratical guides</p>
      
        <div className="about-sidebar">

            {/* ABOUT TEXT */}
            <div className="about-description">
                <p>
                [About Us]...Simple step-by-step guides designed to help beginners understand
                everyday technology, software, and web tools without confusion.
                </p>
            </div>

            {/* NAVIGATION */}
            <div className="about-navigation">
                <h4>Site Information</h4>

                <ul>

                <li>
                    <NavLink to="/">
                    Homepage
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/privacy-policy">
                    Privacy Policy
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/terms">
                    Terms & Conditions
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/disclaimer">
                    Disclaimer
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/contact-us">
                    Contact Us
                    </NavLink>
                </li>

                </ul>

            </div>
        </div>
    </div>
  );
}

export default AboutSidebar;