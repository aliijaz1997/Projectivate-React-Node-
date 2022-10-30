import React, { ReactElement } from "react";
import { Task as TaskType } from "~/web/common/types";
import { BoardTask } from "~/web/features/board/components/BoardTask";

interface Props {
  task: TaskType;
}

export function Task({ task }: Props): ReactElement {
  return (
    <>
      <BoardTask task={task} />
    </>
  );
}
