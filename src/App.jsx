import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import { categories } from "./data/categories";
import CategoryPage from "./pages/CategoryPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import ContactUs from "./pages/ContactUs";
import AdminPanel from "./admin/AdminPanel";


// Dynamic import of all .jsx pages inside pages folder
const tutorials = import.meta.glob("./pages/**/*.jsx");

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Static pages */}
        <Route path="/search" element={<SearchResults />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/admin" element={<AdminPanel />} />

        {/* Dynamic tutorial routes */}
        {categories.flatMap(category =>
          category.guides.map(guide => {
            const filePath = `./pages${guide.path}.jsx`;
            const Component = React.lazy(tutorials[filePath]);

            return (
              <Route
                key={guide.path}
                path={guide.path}
                element={
                  <Suspense fallback={<div>Loading guide...</div>}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })
        )}

        {/* Dynamic category routes */}
        <Route path="/:categorySlug" element={<CategoryPage />} />

        {/* 404 Page */}
        <Route path="*" element={<div>Page not found</div>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;