import { Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const TaskSearch = ({ allTasks, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      const filteredTasks = allTasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      onSearch(filteredTasks);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchTerm, allTasks, onSearch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Input
      placeholder="Search tasks"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default TaskSearch;
