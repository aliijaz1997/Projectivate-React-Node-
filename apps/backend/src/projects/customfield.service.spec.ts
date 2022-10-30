import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { dropDatabase } from '../../test/utils/drop-database';
import { ConfigService } from '@nestjs/config';
import { createDefaultTestData } from '../../test/utils/create-default-test-data';
import { CustomFieldService } from './customfield.service';
import { TaskLogService } from './taskLog.service';
import {
  PROJECT_ID,
  RANDOM_ID,
  TENANT_ID,
  USER_ID,
} from '../../test/utils/constants';
import {
  CustomFieldType,
  ProjectCustomFields,
} from './entities/project.entity';
import { BadRequestException } from '@nestjs/common';

describe('Task service', () => {
  let service: CustomFieldService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomFieldService,
        PrismaService,
        ConfigService,
        TaskLogService,
      ],
    }).compile();

    service = module.get<CustomFieldService>(CustomFieldService);

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

  it('should return all customfields of project', async () => {
    const allCustomFields = await service.listOfCustomFields(PROJECT_ID);

    expect(Object.entries(allCustomFields).length).toBeGreaterThan(0);
  });

  it('should return all customfields items of fields', async () => {
    const fieldItems = await service.listOfCustomFieldItems(
      PROJECT_ID,
      'status',
    );
    expect(fieldItems.length).toBeGreaterThan(0);
  });

  it('should create new custom field', async () => {
    await service.createCustomField(
      {
        name: 'done',
        type: CustomFieldType.DROPDOWN,
      },
      PROJECT_ID,
    );
    const projct = await prisma.project.findUnique({
      where: { id: PROJECT_ID },
    });
    const allCustomFields =
      projct.customFields as unknown as ProjectCustomFields;
    expect(
      Object.entries(allCustomFields)
        .map((c) => c[0])
        .some((title) => title === 'done'),
    ).toBeTruthy();
  });

  it('should create new custom field items', async () => {
    await service.createFieldItem({
      field: 'tags',
      projectId: PROJECT_ID,
      createCustomFieldItemDto: { name: 'hello' },
    });
    const projct = await prisma.project.findUnique({
      where: { id: PROJECT_ID },
    });
    const allCustomFields =
      projct.customFields as unknown as ProjectCustomFields;
    const fieldItem = Object.entries(allCustomFields).find(
      (c) => c[0] === 'tags',
    )[1]['fieldItems'];

    expect(fieldItem.some((f) => f.name === 'hello')).toBeTruthy();
  });

  it('should delete custom field', async () => {
    await service.deleteCustomField({
      field: 'status',
      projectId: PROJECT_ID,
    });
    const allCustomFields = await service.listOfCustomFields(PROJECT_ID);
    const fieldItem = Object.entries(allCustomFields).find(
      (c) => c[0] === 'status',
    );

    expect(fieldItem).toBeFalsy();
  });

  it('should delete custom field item with keeping the tasks not deleted', async () => {
    const projct = await prisma.project.findUnique({
      where: { id: PROJECT_ID },
    });
    const allCustomFields =
      projct.customFields as unknown as ProjectCustomFields;
    const fieldItem = Object.entries(allCustomFields).find(
      (c) => c[0] === 'status',
    )[1]['fieldItems'][0];
    await service.deleteCustomFieldItem({
      projectId: PROJECT_ID,
      field: 'status',
      fieldItemId: fieldItem.id,
      keepTasks: true,
    });
    const project = await prisma.project.findUnique({
      where: { id: PROJECT_ID },
    });
    const customFields = project.customFields as unknown as ProjectCustomFields;
    const fieldItems = Object.entries(customFields).find(
      (c) => c[0] === 'status',
    )[1]['fieldItems'];
    expect(fieldItems.find((f) => f.id === fieldItem.id)).toBeFalsy();
    expect(fieldItems.some((f) => f.name === 'Untitled')).toBeTruthy();
  });

  it('should delete custom field item with all tasks  deleted', async () => {
    const projct = await prisma.project.findUnique({
      where: { id: PROJECT_ID },
    });
    const allCustomFields =
      projct.customFields as unknown as ProjectCustomFields;
    const fieldItem = Object.entries(allCustomFields).find(
      (c) => c[0] === 'status',
    )[1]['fieldItems'][0];
    await service.deleteCustomFieldItem({
      projectId: PROJECT_ID,
      field: 'status',
      fieldItemId: fieldItem.id,
      keepTasks: false,
    });
    const project = await prisma.project.findUnique({
      where: { id: PROJECT_ID },
    });
    const customFields = project.customFields as unknown as ProjectCustomFields;
    const fieldItems = Object.entries(customFields).find(
      (c) => c[0] === 'status',
    )[1]['fieldItems'];
    expect(fieldItems.find((f) => f.id === fieldItem.id)).toBeFalsy();
    expect(fieldItems.some((f) => f.name === 'Untitled')).toBeFalsy();
  });

  it('should update the custom field', async () => {
    const projct = await prisma.project.findUnique({
      where: { id: PROJECT_ID },
    });
    const allCustomFields =
      projct.customFields as unknown as ProjectCustomFields;
    const fieldItem = Object.entries(allCustomFields).find(
      (c) => c[0] === 'status',
    )[1]['fieldItems'][0];
    await service.updateCustomFieldItem({
      projectId: PROJECT_ID,
      field: 'status',
      fieldItemId: fieldItem.id,
      updateCustomFieldItemDto: { name: 'Backlog1' },
    });
    const project = await prisma.project.findUnique({
      where: { id: PROJECT_ID },
    });
    const customFields = project.customFields as unknown as ProjectCustomFields;
    const status = Object.entries(customFields).find(
      (c) => c[0] === 'status',
    )[1];

    expect(status.fieldItems.some((f) => f.name === 'Backlog1')).toBeTruthy();
  });
  it('should not update the custom field status item named Todo', async () => {
    const projct = await prisma.project.findUnique({
      where: { id: PROJECT_ID },
    });
    const allCustomFields =
      projct.customFields as unknown as ProjectCustomFields;
    const fieldItem = Object.entries(allCustomFields).find(
      (c) => c[0] === 'status',
    )[1]['fieldItems'][1];

    await expect(
      service.updateCustomFieldItem({
        projectId: PROJECT_ID,
        field: 'status',
        fieldItemId: fieldItem.id,
        updateCustomFieldItemDto: { name: 'Todo1' },
      }),
    ).rejects.toThrow('The name of this field item cannot be changed');
  });

  it('should not update the custom field status item named Done', async () => {
    const projct = await prisma.project.findUnique({
      where: { id: PROJECT_ID },
    });
    const allCustomFields =
      projct.customFields as unknown as ProjectCustomFields;
    const fieldItem = Object.entries(allCustomFields).find(
      (c) => c[0] === 'status',
    )[1]['fieldItems'][3];

    await expect(
      service.updateCustomFieldItem({
        projectId: PROJECT_ID,
        field: 'status',
        fieldItemId: fieldItem.id,
        updateCustomFieldItemDto: { name: 'Done1' },
      }),
    ).rejects.toThrow('The name of this field item cannot be changed');
  });

  it('should return the list of custom fields of tasks', async () => {
    const task = await prisma.task.create({
      data: {
        projectId: PROJECT_ID,
        customFields: { status: RANDOM_ID },
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        description: 'Replace',
        title: 'task 1',
        position: 0,
        ownerId: USER_ID,
        tenantId: TENANT_ID,
      },
    });
    const taskCustomFields = await service.listOfTasksCustomField({
      taskId: task.id,
    });
    expect(Object.entries(taskCustomFields)[0].length).toBeGreaterThan(0);
  });

  it('should return the list of custom fields of tasks', async () => {
    const task = await prisma.task.create({
      data: {
        projectId: PROJECT_ID,
        customFields: {},
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        description: 'Replace',
        title: 'task 1',
        position: 0,
        ownerId: USER_ID,
        tenantId: TENANT_ID,
      },
    });
    const projct = await prisma.project.findUnique({
      where: { id: PROJECT_ID },
    });
    const allCustomFields =
      projct.customFields as unknown as ProjectCustomFields;
    const fieldItem = Object.entries(allCustomFields).find(
      (c) => c[0] === 'status',
    )[1]['fieldItems'][3];
    await service.assignCustomFieldToTask({
      taskId: task.id,
      field: 'status',
      fieldItemId: fieldItem.id,
      projectId: PROJECT_ID,
    });

    const updatedTask = await prisma.task.findFirst({ where: { id: task.id } });
    const taskCustomField = updatedTask.customFields;

    expect(Object.values(taskCustomField).length).toBeGreaterThan(0);
  });

  it('should update the many field items on task', async () => {
    const task = await prisma.task.create({
      data: {
        projectId: PROJECT_ID,
        customFields: { status: RANDOM_ID },
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        description: 'Replace',
        title: 'task 1',
        position: 0,
        ownerId: USER_ID,
        tenantId: TENANT_ID,
      },
    });
    const projct = await prisma.project.findUnique({
      where: { id: PROJECT_ID },
    });
    const allCustomFields =
      projct.customFields as unknown as ProjectCustomFields;
    const fieldItem = Object.entries(allCustomFields).find(
      (c) => c[0] === 'status',
    )[1]['fieldItems'][3];
    await service.updateManyFieldItemsOnTask({
      taskId: task.id,
      taskCustomFieldsDto: { status: fieldItem.id },
      userId: USER_ID,
      projectId: PROJECT_ID,
    });

    const taskUpdated = await prisma.task.findFirst({ where: { id: task.id } });
    const taskCustomField = taskUpdated.customFields;

    expect(taskCustomField['status']).toEqual(fieldItem.id);
    expect(taskCustomField['status']).not.toEqual(RANDOM_ID);
  });

  it('should update the many field items on task', async () => {
    const task = await prisma.task.create({
      data: {
        projectId: PROJECT_ID,
        customFields: { status: RANDOM_ID },
        dateStart: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        description: 'Replace',
        title: 'task 1',
        position: 0,
        ownerId: USER_ID,
        tenantId: TENANT_ID,
      },
    });
    const projct = await prisma.project.findUnique({
      where: { id: PROJECT_ID },
    });
    const allCustomFields =
      projct.customFields as unknown as ProjectCustomFields;
    const fieldItem = Object.entries(allCustomFields).find(
      (c) => c[0] === 'status',
    )[1]['fieldItems'][3];
    await service.updateManyFieldItemsOnTask({
      taskId: task.id,
      taskCustomFieldsDto: { status: fieldItem.id },
      userId: USER_ID,
      projectId: PROJECT_ID,
    });

    const taskUpdated = await prisma.task.findFirst({ where: { id: task.id } });
    const taskCustomField = taskUpdated.customFields;

    expect(taskCustomField['status']).toEqual(fieldItem.id);
    expect(taskCustomField['status']).not.toEqual(RANDOM_ID);
  });
});
