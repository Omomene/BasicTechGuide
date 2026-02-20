import React from "react";
import { useParams, Link } from "react-router-dom";
import { categories } from "../data/categories";
import Layout from "../components/Layout";

function CategoryPage() {
  const { categorySlug } = useParams();
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) return <div>Category not found</div>;

  return (
    <Layout>
        <div style={{ padding: "2rem" }}>
        <h1>{category.name}</h1>
        <ul>
            {category.guides.map((guide) => (
            <li key={guide.path}>
                <Link to={guide.path}>{guide.title}</Link>
            </li>
            ))}
        </ul>
        </div>
    </Layout>
  );
}

export default CategoryPage;