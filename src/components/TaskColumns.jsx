import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useUpdateTaskStatusMutation } from "../redux/api/api";
import toast from "react-hot-toast";
import { setTasks } from "../redux/slice/taskSlice";
import TaskItem from "./TaskItem";
import TaskSearch from "./TaskSearch";

const columnsFromBackend = {
  pending: {
    name: "pending",
    items: [],
  },
  inprogress: {
    name: "inprogress",
    items: [],
  },
  completed: {
    name: "completed",
    items: [],
  },
};

const TaskColumns = ({ onUpdateTask }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  const [columns, setColumns] = useState(columnsFromBackend);
  const [filteredTasks, setFilteredTasks] = useState(tasks || []);

  const [updateTaskStatus, { isLoading }] = useUpdateTaskStatusMutation();

  useEffect(() => {
    if (tasks) {
      setFilteredTasks(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (filteredTasks) {
      const pending = filteredTasks.filter((task) => task.status === "pending");
      const inprogress = filteredTasks.filter(
        (task) => task.status === "inprogress"
      );
      const completed = filteredTasks.filter(
        (task) => task.status === "completed"
      );

      setColumns({
        pending: { ...columns.pending, items: pending },
        inprogress: { ...columns.inprogress, items: inprogress },
        completed: { ...columns.completed, items: completed },
      });
    }
  }, [filteredTasks, tasks]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    if (sourceColumn === destColumn) {
      return;
    }

    const [removed] = sourceColumn.items.splice(source.index, 1);

    destColumn.items.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceColumn.items,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destColumn.items,
      },
    });

    const updatedTask = { ...removed, status: destination.droppableId };
    const { _id: taskId, status: updatedStatus } = updatedTask;

    try {
      await updateTaskStatus({ taskId, updatedStatus });
      toast.success("Status is updated successsfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }

    const updatedTasks = tasks.map((task) =>
      task._id === updatedTask._id ? updatedTask : task
    );
    dispatch(setTasks(updatedTasks));
  };

  const handleSearch = (filteredTasks) => {
    setFilteredTasks(filteredTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedFilteredTasks = filteredTasks.filter(
      (task) => task._id !== taskId
    );
    setFilteredTasks(updatedFilteredTasks);

    const updatedColumns = { ...columns };
    Object.keys(updatedColumns).forEach((columnId) => {
      updatedColumns[columnId].items = updatedColumns[columnId].items.filter(
        (task) => task._id !== taskId
      );
    });
    setColumns(updatedColumns);

    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    dispatch(setTasks(updatedTasks));
  };

  return (
    <>
      <TaskSearch allTasks={tasks} onSearch={handleSearch} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Stack
          direction={["column", "row"]}
          spacing={["4", "4"]}
          w="full"
          align="flex-start"
          px={["4", "4"]}
          mt={"6"}
        >
          {Object.entries(columns).map(([columnId, column], index) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    margin: "2px",
                    border: "1px solid lightgrey",
                    borderRadius: "4px",
                    padding: "8px",
                    // width: "30%",
                  }}
                  // width={["30%", "full"]}
                  width={["100%", "33%"]}
                >
                  <Heading
                    size="md"
                    textTransform="uppercase"
                    textAlign="center"
                    marginTop="4"
                    marginBottom="4"
                    backgroundColor={"blue.500"}
                  >
                    {column.name}
                  </Heading>
                  {column.items.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <TaskItem
                          task={task}
                          provided={provided}
                          handleDeleteTask={handleDeleteTask}
                          handleUpdateTask={onUpdateTask}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </Stack>
      </DragDropContext>
    </>
  );
};

export default TaskColumns;
