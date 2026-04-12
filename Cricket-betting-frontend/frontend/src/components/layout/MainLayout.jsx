import Header from "./Header";
import "./MainLayout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
      <footer className="main-footer">
        <p>&copy; 2026 BetX Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;