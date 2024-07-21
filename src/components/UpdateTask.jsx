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
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useUpdateTaskMutation } from "../redux/api/api";
import Loader from "./Loader";

const UpdateTask = ({ task, isOpen, onClose, onUpdateTask }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

  const handleUpdateTask = async () => {
    try {
      //   const updatedTask = { ...task, title, description };
      const taskId = task._id;
      //   console.log(taskId);
      const response = await updateTask({
        taskId,
        title,
        description,
      }).unwrap();
      toast.success("Task is updated successfully");

      if (onUpdateTask) {
        onUpdateTask(response?.data);
      }

      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Task</ModalHeader>
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
          <Button colorScheme="blue" mr={3} onClick={handleUpdateTask}>
            Update Task
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTask;
