import { Task } from ".";

export enum SprintSpan {
  ONE_WEEK = "1 Week",
  TWO_WEEKS = "2 Weeks",
  THREE_WEEKS = "3 Weeks",
  FOUR_WEEKS = "4 Weeks",
}

export interface Sprint {
  id: string;
  name: string;
  majorTargets: string;
  sprintSpan: SprintSpan;
  startDate: string;
  endDate: string;
  minorTargets: string;
  customField: string;
}

export interface CurrentSprintRes extends Sprint {
  tasks: Task[];
}

export interface PreviousSprint extends Sprint {
  tasks: Task[];
}

export interface SprintCreate {
  startDate: string;
  majorTargets: string;
  minorTargets: string;
  sprintSpan: SprintSpan;
  customField: string;
}

export type SprintCreateForm = Omit<SprintCreate, "startDate">;
