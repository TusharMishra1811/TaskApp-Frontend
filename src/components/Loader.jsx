import React from "react";
import { VStack, Spinner } from "@chakra-ui/react";

const Loader = ({ color = "yellow.500", size = "xl", speed = "0.65s" }) => {
  return (
    <VStack
      h="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="rgba(0, 0, 0, 0.5)" // Adds a semi-transparent background
      position="fixed"
      top="0"
      left="0"
      width="100%"
      zIndex="9999" // Ensures the loader is on top of other elements
    >
      <Spinner
        thickness="4px"
        speed={speed}
        emptyColor="gray.200"
        color={color}
        size={size}
        style={{ transform: "scale(1.5)" }} // Adjust the scale for a larger spinner
      />
    </VStack>
  );
};

export default Loader;
