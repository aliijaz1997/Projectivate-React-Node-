import { Prisma, Task as PrismaTask } from '@prisma/client';
import { ProjectCustomFields } from 'src/projects/entities/project.entity';

export class Task implements PrismaTask {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  dateEnd: Date;
  dateStart: Date;
  description: string;
  projectId: string;
  sprintId: string;
  ownerId: string;
  tenantId: string;
  position: number;
  parentId: string;
  customFields: Prisma.JsonValue;
  previousSprints: Prisma.JsonValue;
}

export type TaskCustomFields = Record<
  keyof ProjectCustomFields,
  string[] | string
>;
