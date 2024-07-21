import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const AuthLayout = ({ children, authentication }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authentication && isAuthenticated !== authentication) {
      return;
    }
  }, [navigate, isAuthenticated, authentication]);

  if (authentication && isAuthenticated !== authentication) {
    return <Login />;
  }

  return children;
};

export default AuthLayout;
