import { ProjectCustomFields } from "./project";

export interface TaskCreate {
  title: string;
  projectId: string;
  dateStart: string;
  dateEnd: string;
  description: string;
  position: number;
  customFields: TaskCustomFields;
  assigneeId?: string | null;
  parentId?: string;
}

export interface Task {
  id: string;
  title: string;
  projectId: string;
  ownerId: string;
  sprintId: string | null;
  createdAt: string;
  updatedAt: string;
  dateEnd: string;
  dateStart: string;
  description: string;
  position: number;
  assigneeId?: string | null;
  customFields: TaskCustomFields;
  parentId?: string;
  Parent?: Task;
  previousSprints: Record<string, any>;
}

export interface FilterTaskDto {
  assigneeId?: string;
  overdue?: string;
  status?: string;
}
export type TaskCustomFields = Record<
  keyof ProjectCustomFields,
  string | string[]
>;

export interface Log {
  id: string;
  taskId: string;
  userId: string;
  dateStart: string;
  dateEnd: string;
  time: number;
}

export interface LogItem {
  id: string;
  field: string;
  fieldItem: string;
}
