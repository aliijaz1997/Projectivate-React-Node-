import { Controller, Get, Param } from '@nestjs/common';
import { TaskLogService } from './taskLog.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Tasklogs')
@Controller('taskLog')
export class TaskLogController {
  constructor(private readonly taskLogService: TaskLogService) {}

  @Get('tasks/:taskId')
  findAllLogsOfTask(@Param('taskId') id: string) {
    return this.taskLogService.findAllLogsOfTask(id);
  }
  @Get(':taskLogId/taskLogItems')
  findAllLogItemOfLogs(@Param('taskLogId') taskLogId: string) {
    return this.taskLogService.findAllLogItemOfLogs(taskLogId);
  }
}
