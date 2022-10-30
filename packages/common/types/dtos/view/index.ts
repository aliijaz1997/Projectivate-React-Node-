import { View, ViewFilter, ViewGroup } from "../../entities";

export interface CreateViewDto {
  name: string;
  filters: ViewFilter;
  groupings: ViewGroup;
}

export interface CreateViewDtoRes {
  id: string;
  name: string;
  filters: ViewFilter;
  groupings: ViewGroup;
}

export type DeleteViewDtoRes = CreateViewDtoRes;

export type GetAllViewsDtoRes = View[];
