import React from "react";
import { useParams, Link } from "react-router-dom";
import { categories } from "../data/categories";
import { guidesMeta } from "../data/guidesMeta";
import Layout from "../components/Layout";

function CategoryPage() {
  const { categorySlug } = useParams();
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) return <div>Category not found</div>;

  return (
    <Layout>
      <div className="search-container">
        <h1>{category.name}</h1>

        {category.guides.length > 0 ? (
          <div className="search-list">
            {category.guides.map((guide, idx) => {
              const meta = guidesMeta[guide.path];

              return (
                <Link to={guide.path} key={idx} className="search-item">
                  <div className="search-text">
                    <h2>{guide.title}</h2>
                    {meta?.intro ? (
                      <p>{meta.intro}</p>
                    ) : (
                      <p>Click to view the full step-by-step guide.</p>
                    )}
                  </div>

                  {meta?.thumbnail && (
                    <div className="search-thumb">
                      <img src={meta.thumbnail} alt={guide.title} />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <p>No guides found in this category.</p>
        )}
      </div>
    </Layout>
  );
}

export default CategoryPage;