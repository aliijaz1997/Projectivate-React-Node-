import { View } from "@projectivate/common";

export interface ProjectCreate {
  name: string;
  additionalInformation?: Record<string, string>;
}

export interface Project {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  customFields: ProjectCustomFields;
  additionalInformation?: Record<string, string>;
  preferences: ProjectPreferences;
  views: View[];
  currentView?: string;
}

export interface BoardViewPreference {
  name: "board";
  horizontalField: string;
  verticalField: string;
}

export type CalendarViewPreference = unknown;
export type TimelineViewPreference = unknown;
export type ListViewPreference = unknown;

export interface ProjectPreferences {
  viewPreferences: {
    board: BoardViewPreference;
    calendar: CalendarViewPreference;
    timeline: TimelineViewPreference;
    list: ListViewPreference;
  };
}

export type CustomField = {
  type: CustomFieldType;
  fieldItems: CustomFieldItem[];
};

export type ProjectCustomFields = Record<string, CustomField>;

export enum CustomFieldType {
  DROPDOWN = "dropdown",
  CHECKBOX = "checkbox",
}

export interface CustomFieldItem {
  id: string;
  name: string;
  visibility: boolean;
  color?: string;
  position: number;
}

export type TaskStatus = CustomFieldItem;

export interface CustomFieldCreate {
  name: string;
  type: CustomFieldType;
  projectId: string;
}

export type CustomFieldAddForm = Omit<CustomFieldCreate, "projectId">;
export type CustomFieldItemAddForm = Pick<CustomFieldItem, "name">;

export const categoryCustomFieldKey = "category";
export const statusCustomFieldKey = "status";
export const priorityCustomFieldKey = "status";
