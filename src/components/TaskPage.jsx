import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTasksQuery } from "../redux/api/api";
import CreateTask from "./CreateTask";
import { setTasks } from "../redux/slice/taskSlice";
import TaskColumns from "./TaskColumns";

const TaskPage = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useGetTasksQuery();
  const tasks = useSelector((state) => state.task.tasks);

  const addTask = (newTask) => {
    dispatch(setTasks([...tasks, newTask]));
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task._id === updatedTask._id ? updatedTask : task
    );
    dispatch(setTasks(updatedTasks));
  };

  useEffect(() => {
    if (data && data?.data) {
      dispatch(setTasks(data?.data));
    }
  }, [data, dispatch]);

  return (
    <>
      <CreateTask onAddTask={addTask} />
      <TaskColumns onUpdateTask={updateTask} />
    </>
  );
};

export default TaskPage;
