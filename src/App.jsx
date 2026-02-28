import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import { categories } from "./data/categories";
import CategoryPage from "./pages/CategoryPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import ContactUs from "./pages/ContactUs";

// Import all tutorial pages dynamically
const tutorials = import.meta.glob("./pages/**/*.jsx");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        {/* Dynamic Category Routes */}
        {categories.map((category) => (
          <Route
            key={category.slug}
            path="/:categorySlug" element={<CategoryPage />} 
          />
        ))}
        {/* Dynamic Tutorial Routes */}
        {categories.flatMap((category) =>
          category.guides.map((guide) => {
            const filePath = `./pages${guide.path}.jsx`; // matches glob key
            const Component = React.lazy(tutorials[filePath]);
            return (
              <Route
                key={guide.path}
                path={guide.path}
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Component />
                  </React.Suspense>
                }
              />
            );
          })
        )}

        {/* Optional: 404 Page */}
        <Route path="*" element={<div>Page not found</div>} />  
        <Route path="/search" element={<SearchResults />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;