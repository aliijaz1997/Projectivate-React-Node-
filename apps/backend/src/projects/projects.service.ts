import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import {
  CustomFieldType,
  ProjectCustomFields,
  Project,
  CustomFieldItem,
  ProjectPreferences,
} from './entities/project.entity';
import { Prisma } from '@prisma/client';
import { Task } from 'src/tasks/entities/task.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateViewPreferencesDto } from './dto/update-preference.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import {
  Condition,
  CreateViewDto,
  GENERIC_VIEW_CONSTANT,
  Operation,
  View,
} from '@projectivate/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const newrelic = require('newrelic');

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createProjectDto: CreateProjectDto,
    userId: string,
    tenantId: string,
  ) {
    const { name, additionalInformation } = createProjectDto;

    const defaultExtraFields: ProjectCustomFields = {
      status: {
        type: CustomFieldType.DROPDOWN,
        fieldItems: [
          {
            id: uuidv4(),
            name: 'Backlog',
            visibility: true,
            position: 0,
          },
          {
            id: uuidv4(),
            name: 'Todo',
            visibility: true,
            position: 1,
          },
          {
            id: uuidv4(),
            name: 'Doing',
            visibility: true,
            position: 2,
          },
          {
            id: uuidv4(),
            name: 'Done',
            visibility: true,
            position: 3,
          },
        ],
      },
      tags: {
        type: CustomFieldType.CHECKBOX,
        fieldItems: [],
      },
      category: {
        type: CustomFieldType.DROPDOWN,
        fieldItems: [],
      },
      priority: {
        type: CustomFieldType.DROPDOWN,
        fieldItems: [
          {
            id: uuidv4(),
            name: 'Urgent',
            visibility: true,
            position: 0,
          },
          {
            id: uuidv4(),
            name: 'High',
            visibility: true,
            position: 1,
          },
          {
            id: uuidv4(),
            name: 'Normal',
            visibility: true,
            position: 2,
          },
          {
            id: uuidv4(),
            name: 'Low',
            visibility: true,
            position: 3,
          },
        ],
      },
    };

    const projectId = uuidv4();

    const genericView: CreateViewDto = {
      name: GENERIC_VIEW_CONSTANT,
      filters: {
        fields: [],
        op: Operation.AND,
        search: '',
        searchDescription: true,
        searchName: true,
      },
      groupings: {
        field1: 'status',
        field2: 'priority',
      },
    };

    const preferences: ProjectPreferences = {
      viewPreferences: {
        board: {
          name: 'board',
          horizontalField: 'status',
          verticalField: 'priority',
        },
        calendar: {},
        list: {},
        timeline: {},
      },
    };

    return await this.prisma.project.create({
      data: {
        id: projectId,
        name,
        userId,
        tenantId,
        // any to silent prisma error for json value
        customFields: defaultExtraFields as any,
        additionalInformation: additionalInformation as any,
        preferences: preferences as unknown as Prisma.JsonValue,
        views: {
          create: {
            name: genericView.name,
            filters: genericView.filters as unknown as Prisma.JsonValue,
            groupings: genericView.groupings,
          },
        },
      },
    });
  }

  async updateViewPreferences(
    projectId: string,
    viewName: string,
    updateViewPreferencesDto: UpdateViewPreferencesDto,
  ) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });

    const preferences = project.preferences as unknown as ProjectPreferences;

    const updatedViewPreferences = {
      ...preferences.viewPreferences,
      [viewName]: {
        ...preferences.viewPreferences[viewName],
        ...updateViewPreferencesDto,
      },
    };

    const updatedPreferences: ProjectPreferences = {
      ...preferences,
      viewPreferences: updatedViewPreferences,
    };

    const updatedProject = await this.prisma.project.update({
      data: {
        preferences: updatedPreferences as unknown as Prisma.JsonValue,
      },
      where: {
        id: project.id,
      },
    });

    return updatedProject;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithAggregationInput;
  }): Promise<Project[]> {
    const { where, skip, orderBy, cursor, take } = params;
    return await this.prisma.project.findMany({
      where,
      skip,
      orderBy,
      cursor,
      take,
    });
  }

  async findAllTasks({
    filters,
    projectId,
    tenantId,
  }: {
    projectId: string;
    filters: FilterTaskDto;
    tenantId: string;
  }): Promise<Task[]> {
    return newrelic.startSegment('getHelloService', false, async () => {
      const { fields, op, search, searchDescription, searchName } = filters;

      const trimmedSearch = search.trim();
      const isSearch = Boolean(trimmedSearch);
      const filterDescription = isSearch && searchDescription;

      const filterTitle = isSearch && searchName;

      const orFilters = [
        filterDescription
          ? {
              description: {
                contains: trimmedSearch,
              },
            }
          : null,
        filterTitle
          ? {
              title: {
                contains: trimmedSearch,
              },
            }
          : null,
      ].filter((or) => or !== null);

      const sanitizedFields = fields.filter((field) => {
        if (!field.op || !field.value || !field.field) return false;
        return true;
      });

      const fieldsFilters =
        sanitizedFields.length > 0
          ? sanitizedFields.map((field) => {
              if (field.op === Condition.EQ) {
                return {
                  customFields: {
                    path: [field.field],
                    equals: field.value,
                  },
                };
              } else if (field.op === Condition.NOT_EQ) {
                return {
                  customFields: {
                    path: [field.field],
                    not: field.value,
                  },
                };
              }
            })
          : undefined;

      const filteredTasks = await this.prisma.task.findMany({
        where: {
          projectId,
          tenantId,
          OR: orFilters.length > 0 ? orFilters : undefined,
          [op]: fieldsFilters,
        },
        orderBy: { position: 'asc' },
      });

      return filteredTasks;
    });
  }

  async findAllCategoriesByProjectId(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    return project.customFields['category']
      .fieldItems as unknown as CustomFieldItem[];
  }

  async findOne(projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput) {
    return await this.prisma.project.findUnique({
      where: projectWhereUniqueInput,
      include: {
        views: true,
      },
    });
  }

  async remove(where: Prisma.ProjectWhereUniqueInput) {
    return await this.prisma.project.delete({
      where,
    });
  }
}
