import { Prisma, Project as PrismaProject } from '@prisma/client';

export class Project implements PrismaProject {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
  customFields: Prisma.JsonValue;
  additionalInformation: Prisma.JsonValue;
  preferences: Prisma.JsonValue;
  currentView: string;
}

export type CustomField = {
  type: CustomFieldType;
  fieldItems: CustomFieldItem[];
};

export type ProjectCustomFields = Record<string, CustomField>;

export enum CustomFieldType {
  DROPDOWN = 'dropdown',
  CHECKBOX = 'checkbox',
}

export interface BoardViewPreferences {
  name: 'board';
  horizontalField: string;
  verticalField: string;
}

export type CalendarViewPreferences = unknown;
export type TimelineViewPreferences = unknown;
export type ListViewPreferences = unknown;

export interface ProjectPreferences {
  viewPreferences: {
    board: BoardViewPreferences;
    calendar: CalendarViewPreferences;
    timeline: TimelineViewPreferences;
    list: ListViewPreferences;
  };
}

export interface CustomFieldItem {
  id: string;
  name: string;
  visibility: boolean;
  color?: string;
  position: number;
}

export type Status = CustomFieldItem;
export type Category = CustomFieldItem;
