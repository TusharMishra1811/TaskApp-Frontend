import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setUser } from "../redux/slice/authSlice";
import { useLogoutMutation } from "../redux/api/api";
import toast from "react-hot-toast";
import Loader from "./Loader";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setIsAuthenticated(false));
      dispatch(setUser(null));
      navigate("/");
      toast.success("Logged Out successfully");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Flex
      as="nav"
      p={4}
      bg="gray.800"
      color="white"
      align="center"
      justify="space-between"
    >
      {!isAuthenticated ? (
        <Heading size="lg">Trello Clone</Heading>
      ) : (
        <Avatar src={user?.avatar} />
      )}

      <Box>
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <Button colorScheme="yellow" mr={4}>
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button colorScheme="yellow">Signup</Button>
            </Link>
          </>
        ) : (
          <Button colorScheme="yellow" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
