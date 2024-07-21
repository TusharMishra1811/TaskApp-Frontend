import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../constants/constant";
import { useSignupMutation } from "../redux/api/api";
import { setIsAuthenticated, setUser } from "../redux/slice/authSlice";
import InputBox from "./Input";
import Loader from "./Loader";

export const fileUploadCss = {
  cursor: "pointer",
  marginLeft: "-5%",
  width: "110%",
  border: "none",
  height: "100%",
  color: "#ECC94B",
  backgroundColor: "white",
};

const fileUploadStyle = {
  "&::file-selector-button": fileUploadCss,
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignupMutation();

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const onSubmit = async (data) => {
    const myForm = new FormData();

    myForm.append("avatar", image);
    myForm.append("firstName", data.firstName);
    myForm.append("lastName", data.lastName);
    myForm.append("email", data.email);
    myForm.append("password", data.password);
    myForm.append("confirmPassword", data.confirmPassword);


    try {
      const response = await signup(myForm).unwrap();
      dispatch(setIsAuthenticated(true));
      dispatch(setUser(response?.data));
      navigate("/");
      toast.success(`Welcome ${response?.data?.fullName}`);
    } catch (error) {
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
    <Container h={"140vh"}>
      <VStack h={"full"} justifyContent="center" spacing={"5"}>
        <Heading children={"Registration"} />
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <Box my={"4"} display={"flex"} justifyContent={"center"}>
            <Avatar src={imagePrev} size={"2xl"} />
          </Box>
          <InputBox
            label="First Name"
            placeholder="Enter first name"
            type="text"
            {...register("firstName", {
              required: true,
            })}
          />
          {errors.firstName && (
            <Text color={"red.500"}>{errors.firstName.message}</Text>
          )}
          <InputBox
            label="Last Name"
            placeholder="Enter Last name"
            type="text"
            {...register("lastName", {
              required: true,
            })}
          />
          {errors.lastName && (
            <Text color={"red.500"}>{errors.lastName.message}</Text>
          )}
          <InputBox
            label="Email"
            placeholder="Enter Your Email"
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
            label="Password"
            placeholder="Enter the password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && (
            <Text color={"red.500"}>{errors.password.message}</Text>
          )}
          <InputBox
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            {...register("confirmPassword", {
              required: true,
            })}
          />
          {errors.confirmPassword && (
            <Text color={"red.500"}>{errors.confirmPassword.message}</Text>
          )}
          <Box my={"4"}>
            <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
            <Input
              accept="image/*"
              required
              id="chooseAvatar"
              type={"file"}
              focusBorderColor="yellow.500"
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </Box>
          <Button my={"4"} colorScheme="yellow" type="submit" width={"full"}>
            Sign Up
          </Button>
          <VStack>
            <Box
              my={"4"}
              w={"full"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              Already have an account ?{" "}
              <Link to="/login">
                <Button colorScheme="yellow" variant={"link"} ml={"2"}>
                  {" "}
                  Login
                </Button>{" "}
              </Link>
            </Box>
            <Button
              colorScheme="yellow"
              variant={"outline"}
              onClick={signupWithGoogleHandler}
            >
              SignUp with Google
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default Signup;
