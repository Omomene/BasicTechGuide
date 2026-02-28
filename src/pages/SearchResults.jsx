import { useLocation, Link } from "react-router-dom";
import { categories } from "../data/categories";
import { guidesMeta } from "../data/guidesMeta";
import Layout from "../components/Layout";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get("q")?.toLowerCase() || "";

  const results = categories
    .flatMap(cat => cat.guides)
    .filter(guide =>
      guide.title.toLowerCase().includes(query)
    );

  return (
    <Layout>
      <div className="search-container">

        <h1>Search Results</h1>

        {query && (
          <p className="search-info">
            Showing results for: <strong>{query}</strong>
          </p>
        )}

        {results.length > 0 ? (
          <div className="search-list">
            {results.map((guide, idx) => {
              const meta = guidesMeta[guide.path]; // ← define meta here

              return (
                <Link to={guide.path} key={idx} className="search-item">

                  <div className="search-text">
                    <h2>{guide.title}</h2>
                    {meta?.intro ? (
                      <p>{meta.intro}</p>   // use the whole string
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
          <p>No results found.</p>
        )}

      </div>
    </Layout>
  );
}

export default SearchResults;