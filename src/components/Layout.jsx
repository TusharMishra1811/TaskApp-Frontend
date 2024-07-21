import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="sm:flex flex-none">
        <div className="sm:flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;