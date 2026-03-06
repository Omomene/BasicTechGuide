import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children, sidebar }) {
  return (
    <>
      <Header />

      <div className="container">
        <main className="post entry">{children}</main>

        <aside id="sidebar">
          {sidebar ? sidebar : <Sidebar />}
        </aside>
      </div>

      <Footer />
    </>
  );
}

export default Layout;