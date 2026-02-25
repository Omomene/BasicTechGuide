import { useState, useEffect } from "react";
import { categories } from "../data/categories";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const results = categories
    .flatMap(cat => cat.guides)
    .filter(guide =>
      guide.title.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <header id="header" className={scrolled ? "scrolled" : ""}>
      <div className="container">

        {/* Logo */}
        <div id="logo">
          <h1>BasicTechGuide</h1>
          <p>Simple. Practical. Clear.</p>
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
          <form>
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="field"
            />
            <button type="submit" className="button">🔍</button>
          </form>

          {query && results.length > 0 && (
            <ul className="search-results">
              {results.slice(0, 5).map((guide, idx) => (
                <li key={idx}>
                  <Link to={guide.path}>{guide.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;