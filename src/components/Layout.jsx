import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="container">
        <main className="content">{children}</main>
        <aside className="sidebar">
          <Sidebar />
        </aside>
      </div>
      <Footer />
    </>
  );
}

export default Layout;