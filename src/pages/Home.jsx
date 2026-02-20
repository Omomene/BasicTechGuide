import Layout from "../components/Layout";
import { categories } from "../data/categories";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Layout>
      <section className="home-hero">
        <h1>Welcome to BasicTechGuide</h1>
        <p>Beginner-friendly guides to Excel, NetSuite, Power BI, and more.</p>
      </section>

      <section className="featured-guides">
        {categories.map(cat => (
          <div key={cat.slug} className="category-block">
            <h2>{cat.name}</h2>
            <ul>
              {cat.guides.map((guide, idx) => (
                <li key={idx}><Link to={guide.path}>{guide.title}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </Layout>
  );
}

export default Home;