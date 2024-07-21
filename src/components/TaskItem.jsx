import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import toast from "react-hot-toast";
import { MdDelete, MdUpdate } from "react-icons/md";
import { formatTime } from "../helper/helper";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../redux/api/api";
import UpdateTask from "./UpdateTask";

const TaskItem = ({ task, provided, handleDeleteTask, handleUpdateTask }) => {
  const [deleteTask] = useDeleteTaskMutation();
  // const [updateTask] = useUpdateTaskMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onHandleDeleteTask = async () => {
    try {
      const taskId = task._id;
      await deleteTask(taskId);
      handleDeleteTask(taskId);
      toast.success("The task is deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      <Box
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          userSelect: "none",
          padding: "16px",
          margin: "0 0 8px 0",
          minHeight: "50px",
          backgroundColor: "#f6e05e",

          color: "black",
          ...provided.draggableProps.style,
        }}
        borderRadius={"10"}
      >
        <Heading size="md">{task.title}</Heading>
        <Text fontSize={"md"}>{task.description}</Text>

        <Text mt={2} fontSize={"xs"}>
          Created At : {formatTime(task.createdAt)}
        </Text>

        <HStack mt={4}>
          <Button
            leftIcon={<MdDelete />}
            colorScheme="red"
            onClick={onHandleDeleteTask}
          >
            Delete Task
          </Button>
          <Button leftIcon={<MdUpdate />} colorScheme="blue" onClick={onOpen}>
            Update Task
          </Button>
        </HStack>
      </Box>
      <UpdateTask
        task={task}
        isOpen={isOpen}
        onClose={onClose}
        onUpdateTask={handleUpdateTask}
      />
    </>
  );
};

export default TaskItem;
