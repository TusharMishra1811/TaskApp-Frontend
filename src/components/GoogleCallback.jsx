import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuthenticated, setUser } from "../redux/slice/authSlice";
import Loader from "./Loader";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get("user");
    if (user) {
      const parsedUser = JSON.parse(decodeURIComponent(user));
      dispatch(setIsAuthenticated(true));
      dispatch(setUser(parsedUser));
      navigate("/");
    } else {
      navigate("/register");
    }
  }, [dispatch, navigate]);

  return <Loader />;
};

export default GoogleCallback;
