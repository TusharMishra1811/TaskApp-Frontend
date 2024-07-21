import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import GoogleCallback from "./components/GoogleCallback";
import Loader from "./components/Loader";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TaskPage from "./components/TaskPage";
import { server } from "./constants/constant";
import { setIsAuthenticated, setUser } from "./redux/slice/authSlice";
import AuthLayout from "./components/AuthLayout";
import Layout from "./components/Layout";

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${server}/api/v1/myProfile`, { withCredentials: true })
      .then(({ data }) => {
        dispatch(setIsAuthenticated(true));
        dispatch(setUser(data?.data));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <AuthLayout authentication={true}>
                <TaskPage />
              </AuthLayout>
            }
          />

          <Route
            path="/login"
            element={
              <AuthLayout authentication={false}>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/register"
            element={
              <AuthLayout authentication={false}>
                <Signup />
              </AuthLayout>
            }
          />
          <Route
            path="/google/callback"
            element={
              <AuthLayout authentication={false}>
                <GoogleCallback />
              </AuthLayout>
            }
          />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
