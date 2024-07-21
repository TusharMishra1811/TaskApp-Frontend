import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/api.js";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setUser } from "../redux/slice/authSlice";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { server } from "../constants/constant.js";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setIsAuthenticated(true));
      dispatch(setUser(response?.data?.user));
      navigate("/");
      toast.success(`Welcome back ${response?.data?.user?.fullName}`);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  const signupWithGoogleHandler = () => {
    window.location.href = `${server}/api/v1/googlelogin`;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container h={"95vh"}>
      <VStack h={"full"} justifyContent={"center"} spacing={"5"}>
        <Heading children={"Login"} />
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <InputBox
            label="Email*"
            placeholder="Enter your Email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          {errors.email && (
            <Text color={"red.500"}>{errors.email.message}</Text>
          )}

          <InputBox
            label="Password*"
            placeholder="Enter your Password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />

          {errors.password && (
            <Text color={"red.500"}>{errors.password.message}</Text>
          )}

          <Button my={"4"} colorScheme="yellow" type="submit" width={"full"}>
            Login
          </Button>
          <VStack>
            <Box
              my={"4"}
              w={"full"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              Don't have an account ?{" "}
              <Link to="/register">
                <Button colorScheme="yellow" variant={"link"} ml={"2"}>
                  {" "}
                  Sign Up
                </Button>{" "}
              </Link>
            </Box>
            <Button
              colorScheme="yellow"
              variant={"outline"}
              onClick={signupWithGoogleHandler}
            >
              Login with Google
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
