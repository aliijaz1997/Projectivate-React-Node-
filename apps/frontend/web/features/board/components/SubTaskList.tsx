import React from "react";
import { List } from "@mui/material";
import { useTaskListByProjectIdQuery } from "~/web/store/services/tasks.service";
import { useRouter } from "next/router";
import { SubTask } from "./SubTask";

interface SubTaskProps {
  taskId: string;
}

export function SubTaskList({ taskId }: SubTaskProps) {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const { data: tasks } = useTaskListByProjectIdQuery({ projectId });

  const childTasks = React.useMemo(() => {
    return tasks?.filter((task) => task.parentId === taskId);
  }, [taskId, tasks]);

  return (
    <>
      {childTasks && childTasks.length > 0 && (
        <List>
          {childTasks.map((t) => {
            return <SubTask key={t.id} task={t}/>
          })}
        </List>
      )}
    </>
  );
}

