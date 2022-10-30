import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TasksResponse } from './dto/create-task.dto';
import { UpdateTaskDto, UpdateTaskPositionDto } from './dto/update-task.dto';
import { GetUserId } from '../auth/get-user-decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTenantId } from '../common/decorators/gettenantid.decorator';
import { Task, Comment } from '@prisma/client';
import { CreateCommentDto } from './dto/createcomment.dto';
import { UpdateCommentDto } from './dto/UpdateComment.dto';
import { FirebaseAdminService } from '../common/services/firebase-admin/firebase-admin.service';

@ApiBearerAuth()
@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  private logger = new Logger(TasksController.name);
  constructor(
    private readonly tasksService: TasksService,
    private readonly firebaseAdmin: FirebaseAdminService,
  ) {}

  @Post()
  @ApiResponse({ description: 'Created Task', type: TasksResponse })
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUserId() userId: string,
    @GetTenantId() tenantId: string,
  ): Promise<Task> {
    return this.tasksService.create(createTaskDto, userId, tenantId);
  }
  @Post('reorder')
  @ApiResponse({ description: 'Created Task', type: TasksResponse })
  async reorderTasks(
    @Body() reorderTaskDto: UpdateTaskPositionDto[],
  ): Promise<Task[]> {
    return this.tasksService.reorderTasks(reorderTaskDto);
  }

  @Post(':taskId/assignee/:assigneeId')
  async addAssigneeToTask(
    @Param('taskId') taskId: string,
    @Param('assigneeId') assigneeId: string,
  ) {
    return this.tasksService.addAssigneeToTask({ taskId, assigneeId });
  }

  @Delete(':taskId/assignee/:assigneeId')
  async deleteAssigneeFromTask(
    @Param('taskId') taskId: string,
    @Param('assigneeId') assigneeId: string,
  ) {
    return this.tasksService.deleteAssigneeFromTask({ taskId, assigneeId });
  }

  @Post(':taskId/comments')
  async createComment(
    @Param('taskId') taskId: string,
    @Body() createCommentDto: CreateCommentDto,
    @GetUserId() userId: string,
  ): Promise<Comment> {
    return await this.tasksService.createComment(
      createCommentDto,
      userId,
      taskId,
    );
  }

  @Get()
  @ApiResponse({
    description: 'List of tasks',
    type: [TasksResponse],
  })
  async findAll(@GetTenantId() tenantId: string) {
    return this.tasksService.findAll({
      where: { tenantId },
      orderBy: { position: 'asc' },
    });
  }

  @Get(':taskId/assignee')
  async findAssigneesByTask(@Param('taskId') taskId: string) {
    const assignees = await this.tasksService.findAssigneesByTask({ taskId });
    return assignees;
  }

  @Get(':taskId/comments')
  async findAllCommentsOfTask(@Param('taskId') taskId: string) {
    return await this.tasksService.findAllCommentsOfTask(taskId);
  }

  @Get(':id')
  @ApiResponse({
    description: 'Fetched Task with given id ',
    type: TasksResponse,
  })
  async findOne(
    @Param('id') id: string,
    @GetTenantId() tenantId: string,
  ): Promise<Task> {
    const tasks = await this.tasksService.findAll({ where: { id, tenantId } });
    if (tasks.length <= 0) {
      throw new NotFoundException('Task not found');
    }
    return tasks[0];
  }

  @Patch('comments/:commentId')
  async updateComment(
    @GetUserId() userId: string,
    @Param('commentId') commentId: string,
    @Body() updateComment: UpdateCommentDto,
  ) {
    const comment = await this.tasksService.findComment(commentId);
    if (comment.userId !== userId) {
      throw new ForbiddenException(' You cannot update the comment ');
    }

    return await this.tasksService.updateComment({
      where: { id: commentId },
      data: updateComment,
    });
  }

  @Patch(':id')
  @ApiResponse({ description: 'Updated Task', type: TasksResponse })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetTenantId() tenantId: string,
  ): Promise<Task> {
    const tasks = await this.tasksService.findAll({ where: { id, tenantId } });
    if (tasks.length <= 0) {
      throw new NotFoundException('Task Not Found');
    }
    try {
      return this.tasksService.update({
        where: { id: id },
        data: updateTaskDto,
      });
    } catch (error) {
      this.logger.error('Internal server error', JSON.stringify(error.message));
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete('comments/:commentId')
  async deleteComment(
    @Param('commentId') commentId: string,
    @GetUserId() userId: string,
  ) {
    const comment = await this.tasksService.findComment(commentId);

    if (comment.userId !== userId) {
      throw new ForbiddenException('Cannot delete the comment');
    }
    return await this.tasksService.deleteComment(commentId);
  }

  @Delete(':id')
  @ApiResponse({ description: 'Deleted Task', type: TasksResponse })
  async remove(@Param('id') id: string, @GetTenantId() tenantId: string) {
    const tasks = await this.tasksService.findAll({ where: { id, tenantId } });
    if (tasks.length <= 0) {
      throw new NotFoundException('Task Not Found');
    }
    try {
      return this.tasksService.remove({ id: id });
    } catch (error) {
      this.logger.error('Internal server error', JSON.stringify(error.message));
      throw new InternalServerErrorException(error.message);
    }
  }
}
