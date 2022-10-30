import React, { FormEvent, useState } from "react";
import { FaRegCheckSquare } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { TaskItem } from "./TaskItem";
import AddTask from "./AddTask";
import { useTaskListByProjectIdQuery } from "~/web/store/services/tasks.service";
import { useRouter } from "next/router";
import { Task } from "~/web/common/types";
import { Box } from "@mui/material";
import useStyles from "./index.styles";
export interface ChildTasks {
  taskId: string;
  categoryId: string;
}
export function Tasks({ taskId, categoryId }: ChildTasks) {
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { data: tasks, isLoading } = useTaskListByProjectIdQuery({ projectId });
  const [todos, setTodos] = useState([
    { id: uuidv4(), completed: false, task: "First todo" },
    { id: uuidv4(), completed: true, task: "Second todo" },
  ]);
  const toggleTaskForm = () => {
    setShowTaskForm(true);
  };
  const handleTodoCompleted = (id: string) => {
    const newTodos = todos.map((currentTodo) => {
      if (currentTodo.id === id) {
        return { ...currentTodo, completed: !currentTodo.completed };
      }
      return currentTodo;
    });
    setTodos(newTodos);
  };
  const styles = useStyles({});
  if (!tasks) return <Box>No Child tasks</Box>;
  if (isLoading) return <Box>Loading Child tasks</Box>;
  return (
    <Box sx={{ display: "flex", p: "0.75rem", mt: "2.5rem", mx: "1.25rem" }}>
      <Box sx={{ mr: "0.75rem", mt: "0.25rem" }}>
        <FaRegCheckSquare
          style={{ width: "1.25", height: "1.25rem", color: " rgb(75 85 99)" }}
        />
      </Box>
      <Box sx={{ width: "16.7rem" }}>
        <Box
          sx={{
            fontSize: "1.25rem",
            lineHeight: "1.75rem",
            fontWeight: 600,
            color: " rgb(75 85 99)",
          }}
        >
          Tasks
        </Box>
        {tasks.map((task: Task) => {
          if (task.parentId === taskId) {
            return (
              <TaskItem
                handleTodoCompleted={handleTodoCompleted}
                todo={task}
                key={task.id}
              />
            );
          }
        })}
        {showTaskForm ? (
          <AddTask
            projectId={projectId}
            setShowTaskForm={setShowTaskForm}
            categoryId={categoryId}
            taskId={taskId}
          />
        ) : (
          <Box sx={styles.addTaskContainer} onClick={toggleTaskForm}>
            Add task
          </Box>
        )}
      </Box>
    </Box>
  );
}
