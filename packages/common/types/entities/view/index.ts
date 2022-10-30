import { Prisma, View as PrismaView } from "@prisma/client";
import { FilterTaskDto } from "../../dtos";

export class View {
  id: string;
  name: string;
  filters: ViewFilter;
  groupings: ViewGroup;
  projectId: string | null;
}

export type ViewFilter = FilterTaskDto;

export type ViewGroup = {
  field1: string;
  field2: string;
};
