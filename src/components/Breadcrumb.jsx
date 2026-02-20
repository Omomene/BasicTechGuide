import { Link } from "react-router-dom";

function Breadcrumb({ category, guide }) {
  return (
    <nav className="breadcrumb">
      <Link to="/">Home</Link> / 
      <Link to={`/${category.slug}`}>{category.name}</Link> / 
      <span>{guide.title}</span>
    </nav>
  );
}

export default Breadcrumb;