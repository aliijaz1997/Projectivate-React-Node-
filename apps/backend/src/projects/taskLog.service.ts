import { Injectable } from '@nestjs/common';
import { TaskCustomFields } from 'src/tasks/entities/task.entity';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { ProjectCustomFields } from './entities/project.entity';

@Injectable()
export class TaskLogService {
  constructor(private prisma: PrismaService) {}
  async create({
    taskId,
    allProjectFields,
    userId,
    taskCustomFieldsDto,
  }: {
    taskId: string;
    userId: string;
    allProjectFields: ProjectCustomFields;
    taskCustomFieldsDto: TaskCustomFields;
  }) {
    const fields = Object.keys(taskCustomFieldsDto);
    const fieldItems = Object.values(taskCustomFieldsDto);
    const field1 = fields[0];
    const fieldItemId1 = fieldItems[0] as string;
    const fieldItem1 = allProjectFields[field1]['fieldItems'].find(
      (item) => item.id === fieldItemId1,
    ).name;
    if (fields.length < 2) {
      await this.update({
        taskId,
        dateEnd: new Date().toISOString(),
      });
      const taskLog = await this.prisma.taskLog.create({
        data: {
          dateStart: new Date().toISOString(),
          dateEnd: new Date().toISOString(),
          taskId,
          userId,
        },
      });
      const taskLogItem1 = await this.prisma.taskLogItem.create({
        data: { field: field1, fieldItem: fieldItem1 },
      });
      await this.prisma.taskLogToTaskLogItem.create({
        data: { taskLogId: taskLog.id, taskLogItemId: taskLogItem1.id },
      });
      return taskLog;
    } else {
      const field2 = fields[1];
      const fieldItemId2 = fieldItems[1] as string;
      const fieldItem1 = allProjectFields[field1]['fieldItems'].find(
        (item) => item.id === fieldItemId1,
      ).name;
      const fieldItem2 = allProjectFields[field2]['fieldItems'].find(
        (item) => item.id === fieldItemId2,
      ).name;
      await this.update({
        taskId,
        dateEnd: new Date().toISOString(),
      });
      const taskLog = await this.prisma.taskLog.create({
        data: {
          dateStart: new Date().toISOString(),
          dateEnd: new Date().toISOString(),
          taskId,
          userId,
        },
      });
      const taskLogItem1 = await this.prisma.taskLogItem.create({
        data: { field: field1, fieldItem: fieldItem1 },
      });
      const taskLogItem2 = await this.prisma.taskLogItem.create({
        data: { field: field2, fieldItem: fieldItem2 },
      });

      await this.prisma.taskLogToTaskLogItem.create({
        data: { taskLogId: taskLog.id, taskLogItemId: taskLogItem1.id },
      });
      await this.prisma.taskLogToTaskLogItem.create({
        data: { taskLogId: taskLog.id, taskLogItemId: taskLogItem2.id },
      });
      return taskLog;
    }
  }

  async update({ dateEnd, taskId }: { dateEnd: string; taskId: string }) {
    const logs = await this.prisma.taskLog.findMany({
      where: { taskId },
    });
    if (logs.length > 0) {
      const logIdToBeUpdated = logs[logs.length - 1].id;
      if (!logIdToBeUpdated) {
        return;
      }
      const log = await this.prisma.taskLog.findUnique({
        where: { id: logIdToBeUpdated },
      });
      const totalTimeMilli = Math.abs(
        new Date(log.dateStart).getTime() - new Date(dateEnd).getTime(),
      );
      const toatalTimeMinutes = totalTimeMilli / 1000 / 60;

      return await this.prisma.taskLog.update({
        where: { id: logIdToBeUpdated },
        data: { dateEnd, time: toatalTimeMinutes },
      });
    }
    return null;
  }

  async findAllLogsOfTask(taskId: string) {
    const logs = await this.prisma.taskLog.findMany({
      where: { taskId },
    });
    return logs;
  }

  async findAllLogItemOfLogs(logId: string) {
    const logItems = await this.prisma.taskLogItem.findMany({
      where: { TaskLogToTaskLogItem: { some: { taskLogId: logId } } },
    });
    return logItems;
  }
}
