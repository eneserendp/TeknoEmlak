import React from "react";
import Footer from "../components/layout/layout/Footer";
import Header from "../components/layout/layout/Header";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;