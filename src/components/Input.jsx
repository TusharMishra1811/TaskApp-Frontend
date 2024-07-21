import { Box, FormLabel, Input } from "@chakra-ui/react";
import React, { useId, forwardRef } from "react";

const InputBox = forwardRef(function InputBox(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <Box my={"4"}>
      <FormLabel children={`${label}`} htmlFor={id} />
      <Input
        type={type}
        ref={ref}
        id={id}
        {...props}
        focusBorderColor="yellow.500"
      />
    </Box>
  );
});

export default InputBox;
