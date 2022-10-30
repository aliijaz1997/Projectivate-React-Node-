import { Task } from "@prisma/client";

export interface FilterTaskDto {
  op: Operation;
  fields: FilterRule[];
  search: string;
  searchName: boolean;
  searchDescription: boolean;
}

export type FilterTaskDtoRes = Task[];

export class FilterRule {
  field: string;
  op: Condition;
  value: string;
}

export enum Operation {
  AND = "AND",
  OR = "OR",
}

export enum Condition {
  EQ = "Is",
  NOT_EQ = "Is Not",
}
