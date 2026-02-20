import { categories } from "../data/categories";
import { Link } from "react-router-dom";
import AdBlock from "./AdBlock";

function Sidebar() {
  return (
    <div>
      <h3>Categories</h3>
      {categories.map(cat => (
        <div key={cat.slug} className="sidebar-category">
          <h4>{cat.name}</h4>
          <ul>
            {cat.guides.map((guide, idx) => (
              <li key={idx}><Link to={guide.path}>{guide.title}</Link></li>
            ))}
          </ul>
        </div>
      ))}

      <AdBlock />
    </div>
  );
}

export default Sidebar;