import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import toast from "react-hot-toast";
import { useCreateTaskMutation } from "../redux/api/api";
import Loader from "./Loader";

const CreateTask = ({ onAddTask }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [addTask, { isLoading }] = useCreateTaskMutation();

  const handleAddTask = async () => {
    try {
      const response = await addTask({ title, description }).unwrap();
      console.log(response?.data);
      toast.success("Task is created successfully");
      if (onAddTask) {
        onAddTask(response?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
    setTitle("");
    setDescription("");
    onClose();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box m={"6"} p={"4"}>
        <Button colorScheme="yellow" onClick={onOpen}>
          Add Task
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalBody>
            <FormControl isRequired mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                rows={4}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={handleAddTask}>
              Add Task
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTask;
