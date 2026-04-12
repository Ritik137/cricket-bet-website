import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;