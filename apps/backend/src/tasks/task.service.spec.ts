import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAdminService } from '../common/services/firebase-admin/firebase-admin.service';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { TasksService } from './tasks.service';
import { createDefaultTestData } from '../../test/utils/create-default-test-data';
import { dropDatabase } from '../../test/utils/drop-database';
import {
  FIELD_ITEM1,
  FIELD_ITEM2,
  PROJECT_ID,
  TENANT_ID,
  USER_ID,
} from '../../test/utils/constants';

describe('Task service', () => {
  let service: TasksService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        PrismaService,
        FirebaseAdminService,
        ConfigService,
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);

    prisma = module.get<PrismaService>(PrismaService);
  });
  beforeEach(async () => {
    await createDefaultTestData(prisma);
  });
  afterEach(async () => {
    await dropDatabase(prisma);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create task', async () => {
    const taskCreated = await service.create(
      {
        projectId: PROJECT_ID,
        customFields: {},
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        description: 'Replace',
        assigneeId: USER_ID,
        title: 'task 1',
        position: 0,
      },
      USER_ID,
      TENANT_ID,
    );
    const task = await prisma.task.findUnique({
      where: { id: taskCreated.id },
    });

    expect(task).toBeTruthy();
    expect(task).toHaveProperty('description', 'Replace');
    expect(task).toHaveProperty('projectId', PROJECT_ID);
    expect(task).toHaveProperty('title', 'task 1');
    expect(task).toHaveProperty('ownerId', USER_ID);
    expect(task).toHaveProperty('tenantId', TENANT_ID);
  });

  it('should reorder task', async () => {
    const taskCreated = await service.create(
      {
        projectId: PROJECT_ID,
        customFields: {},
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        description: 'Replace',
        assigneeId: USER_ID,
        title: 'task 1',
        position: 0,
      },
      USER_ID,
      TENANT_ID,
    );

    await service.reorderTasks([{ position: 5, taskId: taskCreated.id }]);
    const reorderedTask = await prisma.task.findUnique({
      where: { id: taskCreated.id },
    });
    expect(reorderedTask.position).toEqual(5);
  });

  it('should add assignee', async () => {
    const taskCreated = await service.create(
      {
        projectId: PROJECT_ID,
        customFields: {},
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        description: 'Replace',
        assigneeId: USER_ID,
        title: 'task 1',
        position: 0,
      },
      USER_ID,
      TENANT_ID,
    );
    await service.addAssigneeToTask({
      assigneeId: USER_ID,
      taskId: taskCreated.id,
    });
    const task = await prisma.task.findUnique({
      where: { id: taskCreated.id },
      include: { assignee: true },
    });
    expect(task.assignee.length).toBeGreaterThan(0);
    expect(task.assignee.some((u) => u.assigneeId === USER_ID)).toBeTruthy();
  });

  it('should delete assignee', async () => {
    const taskCreated = await service.create(
      {
        projectId: PROJECT_ID,
        customFields: {},
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        description: 'Replace',
        assigneeId: USER_ID,
        title: 'task 1',
        position: 0,
      },
      USER_ID,
      TENANT_ID,
    );
    await service.addAssigneeToTask({
      assigneeId: USER_ID,
      taskId: taskCreated.id,
    });
    await service.deleteAssigneeFromTask({
      assigneeId: USER_ID,
      taskId: taskCreated.id,
    });
    const task = await prisma.task.findUnique({
      where: { id: taskCreated.id },
      include: { assignee: true },
    });
    expect(task.assignee.length).toBeLessThanOrEqual(0);
    expect(task.assignee.some((u) => u.assigneeId === USER_ID)).toBeFalsy();
  });

  it('should create comment', async () => {
    const taskCreated = await service.create(
      {
        projectId: PROJECT_ID,
        customFields: {},
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        description: 'Replace',
        assigneeId: USER_ID,
        title: 'task 1',
        position: 0,
      },
      USER_ID,
      TENANT_ID,
    );

    await service.createComment({ content: 'hello' }, USER_ID, taskCreated.id);

    const comments = await prisma.comment.findMany();
    expect(comments.length).toBeGreaterThan(0);
  });

  it('should find All tasks', async () => {
    await service.create(
      {
        projectId: PROJECT_ID,
        customFields: {},
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        description: 'Replace',
        assigneeId: USER_ID,
        title: 'task 1',
        position: 0,
      },
      USER_ID,
      TENANT_ID,
    );

    const allTasks = await service.findAll({
      where: { projectId: PROJECT_ID, tenantId: TENANT_ID },
    });
    expect(allTasks.length).toBeGreaterThan(0);
  });

  it('should delete comment', async () => {
    const taskCreated = await service.create(
      {
        projectId: PROJECT_ID,
        customFields: {},
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        description: 'Replace',
        assigneeId: USER_ID,
        title: 'task 1',
        position: 0,
      },
      USER_ID,
      TENANT_ID,
    );

    const createdComment = await service.createComment(
      { content: 'hello' },
      USER_ID,
      taskCreated.id,
    );

    await service.deleteComment(createdComment.id);

    const comment = await prisma.comment.findUnique({
      where: { id: createdComment.id },
    });
    expect(comment).toBeFalsy();
  });

  it('should update task', async () => {
    const taskCreated = await service.create(
      {
        projectId: PROJECT_ID,
        customFields: { status: FIELD_ITEM1 },
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        description: 'Replace',
        assigneeId: USER_ID,
        title: 'task 1',
        position: 0,
      },
      USER_ID,
      TENANT_ID,
    );

    const update = await service.update({
      where: { id: taskCreated.id },
      data: {
        title: 'task2',
        position: 1,
        description: 'Not replace',
        customFields: { status: FIELD_ITEM2 },
      },
    });

    expect(update.description).toEqual('Not replace');
    expect(update.description).not.toEqual('Replace');
    expect(update.position).not.toEqual(0);
    expect(update.position).toEqual(1);
    expect(update.title).toEqual('task2');
    expect(update.customFields['status']).toEqual(FIELD_ITEM2);
    expect(update.title).not.toEqual('task 1');
  });

  it('should update comment', async () => {
    const taskCreated = await service.create(
      {
        projectId: PROJECT_ID,
        customFields: { status: FIELD_ITEM1 },
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        description: 'Replace',
        assigneeId: USER_ID,
        title: 'task 1',
        position: 0,
      },
      USER_ID,
      TENANT_ID,
    );

    const createdComment = await service.createComment(
      { content: 'hello' },
      USER_ID,
      taskCreated.id,
    );

    const update = await service.updateComment({
      where: { id: createdComment.id },
      data: { content: 'world' },
    });

    expect(update.content).toEqual('world');
  });

  it('should delete task', async () => {
    const taskCreated = await service.create(
      {
        projectId: PROJECT_ID,
        customFields: { status: FIELD_ITEM1 },
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        description: 'Replace',
        assigneeId: USER_ID,
        title: 'task 1',
        position: 0,
      },
      USER_ID,
      TENANT_ID,
    );

    await service.remove({ id: taskCreated.id });

    const deletedTask = await prisma.comment.findUnique({
      where: { id: taskCreated.id },
    });
    expect(deletedTask).toBeFalsy();
  });
});
