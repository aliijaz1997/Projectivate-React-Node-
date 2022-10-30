import { TimeTrack as PrismaTimeTrack } from '@prisma/client';
export class TimeTrack implements PrismaTimeTrack {
  id: string;
  startDate: Date;
  endDate: Date;
  taskId: string;
  userId: string;
}
