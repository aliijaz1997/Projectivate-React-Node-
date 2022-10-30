import { Test, TestingModule } from '@nestjs/testing';
import { dropDatabase } from '../../test/utils/drop-database';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { RANDOM_ID, TENANT_ID, USER_ID } from '../../test/utils/constants';
import { ProjectsService } from './projects.service';
import { Operation } from '@projectivate/common';
import { createDefaultTestData } from '../../test/utils/create-default-test-data';

describe('Task service', () => {
  let service: ProjectsService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService, PrismaService],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);

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

  it('should create project', async () => {
    await service.create(
      { name: 'project', additionalInformation: {} },
      USER_ID,
      TENANT_ID,
    );

    const projects = await prisma.project.findMany();

    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].customFields).toBeTruthy();
    expect(projects[0]).toHaveProperty('tenantId', TENANT_ID);
    expect(projects[0]).toHaveProperty('userId', USER_ID);
    expect(projects[0]).toHaveProperty('name', 'hello');
    expect(Object.entries(projects[0].customFields).length).toEqual(4);
    expect(Object.entries(projects[0].customFields['status'])).toBeTruthy();
    expect(Object.entries(projects[0].customFields['tags'])).toBeTruthy();
    expect(Object.entries(projects[0].customFields['priority'])).toBeTruthy();
    expect(Object.entries(projects[0].customFields['category'])).toBeTruthy();
  });

  it('should update view preference', async () => {
    const project = await service.create(
      { name: 'project', additionalInformation: {} },
      USER_ID,
      TENANT_ID,
    );

    const updatedProject = await service.updateViewPreferences(
      project.id,
      'board',
      {
        horizontalField: 'tags',
        verticalField: 'priority',
      },
    );
    expect(
      Object(updatedProject.preferences)['viewPreferences']['board'][
        'horizontalField'
      ],
    ).toEqual('tags');
    expect(
      Object(updatedProject.preferences)['viewPreferences']['board'][
        'verticalField'
      ],
    ).toEqual('priority');
  });

  it('should return all the projects of tenant', async () => {
    await service.create(
      { name: 'project', additionalInformation: {} },
      USER_ID,
      TENANT_ID,
    );
    const allProjectsOfTenant = await service.findAll({
      where: { userId: USER_ID, tenantId: TENANT_ID },
    });

    expect(allProjectsOfTenant.length).toBeGreaterThan(0);
    expect(allProjectsOfTenant.every((p) => p.tenantId === TENANT_ID))
      .toBeTruthy;
  });

  it('should return the project of the given id', async () => {
    const createdProject = await service.create(
      { name: 'project', additionalInformation: {} },
      USER_ID,
      TENANT_ID,
    );
    const project = await service.findOne({
      id: createdProject.id,
    });

    expect(project).toBeTruthy();
    expect(project.name).toEqual('project');
  });

  it('should return all tasks of tenant and project', async () => {
    const createdProject = await service.create(
      { name: 'project', additionalInformation: {} },
      USER_ID,
      TENANT_ID,
    );
    await prisma.task.create({
      data: {
        title: 'hello',
        position: 0,
        description: 'Replace',
        dateEnd: new Date().toISOString(),
        dateStart: new Date().toISOString(),
        tenantId: TENANT_ID,
        projectId: createdProject.id,
        customFields: {},
        ownerId: USER_ID,
      },
    });

    const tasks = await service.findAllTasks({
      projectId: createdProject.id,
      tenantId: TENANT_ID,
      filters: {
        fields: [],
        op: Operation.AND,
        search: '',
        searchDescription: true,
        searchName: true,
      },
    });

    expect(tasks.length).toBeGreaterThan(0);
  });

  it('should return all categories of project', async () => {
    const createdProject = await service.create(
      { name: 'project', additionalInformation: {} },
      USER_ID,
      TENANT_ID,
    );
    await prisma.project.update({
      where: { id: createdProject.id },
      data: {
        customFields: {
          category: {
            fieldItems: [
              {
                id: RANDOM_ID,
                name: 'hello',
                visibility: true,
                position: 0,
              },
            ],
          },
        },
      },
    });
    const categories = await service.findAllCategoriesByProjectId(
      createdProject.id,
    );

    expect(categories.length).toBeGreaterThan(0);
  });
});
