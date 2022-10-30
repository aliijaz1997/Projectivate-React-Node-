import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto, UpdateTaskPositionDto } from './dto/update-task.dto';
import { Prisma } from '.prisma/client';
import { CreateCommentDto } from './dto/createcomment.dto';
import { UpdateCommentDto } from './dto/UpdateComment.dto';
import { FirebaseAdminService } from '../common/services/firebase-admin/firebase-admin.service';
@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseAdmin: FirebaseAdminService,
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
    ownerId: string,
    tenantId: string,
  ) {
    const {
      title,
      customFields,
      description,
      dateStart,
      dateEnd,
      projectId,
      position,
      parentId,
    } = createTaskDto;

    return await this.prisma.task.create({
      data: {
        title,
        description,
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
        projectId,
        ownerId,
        tenantId,
        position,
        parentId,
        customFields: customFields,
      },
    });
  }

  async reorderTasks(reorderTaskDto: UpdateTaskPositionDto[]) {
    const orderedtasks = reorderTaskDto.map(async (t) => {
      return await this.prisma.task.update({
        where: { id: t.taskId },
        data: { position: t.position },
      });
    });
    return Promise.all(orderedtasks);
  }
  async addAssigneeToTask({ taskId, assigneeId }) {
    return this.prisma.assigneesOnTask.create({
      data: { taskId, assigneeId },
    });
  }
  async findAssigneesByTask({ taskId }) {
    const assignees = await this.prisma.user.findMany({
      where: {
        AssignedTask: { some: { taskId } },
      },
    });
    const members = await this.firebaseAdmin.firebase
      .auth()
      .getUsers([...assignees.map((a) => ({ email: a.email }))]);
    const assigneeWithName = members.users.map((m) => {
      return {
        id: m.uid,
        email: m.email,
        displayName: m.displayName,

        createdAt: new Date(m.metadata.creationTime),
        updatedAt: new Date(m.metadata.lastSignInTime),
      };
    });
    return assigneeWithName;
  }
  async deleteAssigneeFromTask({ taskId, assigneeId }) {
    return this.prisma.assigneesOnTask.delete({
      where: { taskId_assigneeId: { assigneeId, taskId } },
    });
  }

  async createComment(
    createComment: CreateCommentDto,
    userId: string,
    taskId: string,
  ) {
    const { content } = createComment;
    return await this.prisma.comment.create({
      data: {
        content,
        taskId,
        userId,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithAggregationInput;
  }) {
    const { where, skip, orderBy, cursor, take } = params;
    return await this.prisma.task.findMany({
      where,
      skip,
      orderBy,
      cursor,
      take,
      include: { Parent: true },
    });
  }
  async findAllCommentsOfTask(taskId: string) {
    const comments = await this.prisma.comment.findMany({
      where: {
        taskId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const members = await this.firebaseAdmin.firebase
      .auth()
      .getUsers([...comments.map((a) => ({ uid: a.userId }))]);

    const users = members.users.reduce((prev, current) => {
      return {
        ...prev,
        [current.uid]: {
          id: current.uid,
          email: current.email,
          displayName: current.displayName,

          createdAt: new Date(current.metadata.creationTime),
          updatedAt: new Date(current.metadata.lastSignInTime),
        },
      };
    }, {});
    const newComments = comments.map((comment) => {
      const newUser = users[comment.userId];

      return {
        ...comment,
        user: newUser,
      };
    });
    return newComments;
  }

  async findComment(commentId: string) {
    return this.prisma.comment.findUnique({ where: { id: commentId } });
  }
  async deleteComment(commentId: string) {
    return await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }

  async findOne(params: { where: Prisma.TaskWhereUniqueInput }) {
    const { where } = params;
    const task = await this.prisma.task.findUnique({
      where,
    });
    return task;
  }

  async update(params: {
    data: UpdateTaskDto;
    where: Prisma.TaskWhereUniqueInput;
  }) {
    const { data, where } = params;
    const { customFields } = data;
    const taskToUpdate = await this.prisma.task.findFirst({
      where,
    });

    // partial updates for json fields
    const updatedTask = {
      ...taskToUpdate,
      ...data,
      customFields: {
        ...(taskToUpdate.customFields as unknown as any),
        ...customFields,
      },
    };

    return await this.prisma.task.update({
      where,
      data: { ...updatedTask, updatedAt: new Date() },
    });
  }
  async updateComment(params: {
    data: UpdateCommentDto;
    where: Prisma.CommentWhereUniqueInput;
  }) {
    const { data, where } = params;
    return await this.prisma.comment.update({
      where,
      data: { ...data, createdAt: new Date() },
    });
  }

  async remove(where: Prisma.TaskWhereUniqueInput) {
    const deleteTask = await this.prisma.task.delete({
      where,
    });
    return deleteTask;
  }
}
