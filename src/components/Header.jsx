import { useState, useEffect } from "react";
import { categories } from "../data/categories";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/BasicTechGuide-logo.png";

function Header() {
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <header id="header" className={scrolled ? "scrolled" : ""}>
      <div className="container">

        {/* Logo */}
        <div id="logo">
          <Link to="/">
            <img src={logo} alt="BasicTechGuide Logo" />
          </Link>
        </div>

        {/* Navigation */}
        <nav>
          <ul>
            {categories.map((cat, index) => (
              <li
                key={index}
                className={
                  location.pathname.startsWith(`/${cat.slug}`)
                    ? "current"
                    : ""
                }
              >
                <Link
                  to={`/${cat.slug}`}
                  className={cat.pro ? "pro" : ""}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search */}
        <div id="search">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search guides and tutorials..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="field full"
            />
          </form>
        </div>

      </div>
    </header>
  );
}

export default Header;