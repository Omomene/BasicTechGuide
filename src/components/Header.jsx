import { useState } from "react";
import { categories } from "../data/categories";
import { Link } from "react-router-dom";

function Header() {
  const [query, setQuery] = useState("");

  const results = categories
    .flatMap(cat => cat.guides)
    .filter(guide =>
      guide.title.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <Link to="/">BasicTechGuide</Link>
        </div>

        <nav className="header-nav">
          {categories.map((cat, index) => (
            <Link key={index} to={`/category/${cat.slug}`}>
              {cat.name}
            </Link>
          ))}
        </nav>

        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

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