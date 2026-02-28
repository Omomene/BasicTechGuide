import { useState, useEffect, useRef } from "react";
import { categories } from "../data/categories";
import { Link, useLocation } from "react-router-dom";
import AdBlock from "./AdBlock";

function Sidebar() {
  const location = useLocation();
  const [openCategory, setOpenCategory] = useState(null);
  const adRef = useRef(null);
  const wrapperRef = useRef(null);

  // Auto-open current article category
  useEffect(() => {
    const currentCat = categories.find(cat =>
      cat.guides.some(guide => guide.path === location.pathname)
    );
    if (currentCat) setOpenCategory(currentCat.slug);
  }, [location.pathname]);

  const toggleCategory = (slug) => {
    setOpenCategory(openCategory === slug ? null : slug);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!adRef.current || !wrapperRef.current) return;

      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const adHeight = adRef.current.offsetHeight;
      const topOffset = 100; // distance from top

      const maxTranslate = wrapperRect.height - adHeight;
      let translate = -wrapperRect.top + topOffset;
      if (translate < 0) translate = 0;
      if (translate > maxTranslate) translate = maxTranslate;

      adRef.current.style.transform = `translateY(${translate}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div id="sidebar" ref={wrapperRef}>
      <p>Simple pratical guides</p>
      {categories.map((cat) => (
        <div key={cat.slug} className="sidebar-category">
          <h3
            className="sidebar-title"
            onClick={() => toggleCategory(cat.slug)}
          >
            {cat.name}{" "}
            <span className={`arrow ${openCategory === cat.slug ? "open" : ""}`}>
              ▸
            </span>
          </h3>

          {openCategory === cat.slug && (
            <ul>
              {cat.guides.map((guide, idx) => (
                <li key={idx}>
                  <Link
                    to={guide.path}
                    className={location.pathname === guide.path ? "current_page_item" : ""}
                  >
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;