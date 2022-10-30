import { GENERIC_VIEW_CONSTANT, Operation } from '@projectivate/common';
import { PrismaService } from '../../src/common/services/prisma/prisma.service';
import { CustomFieldType } from '../../src/projects/entities/project.entity';
import { Prisma } from '@prisma/client';
import { TENANT_ID, USER_ID, PROJECT_ID } from './constants';
import { v4 as uuid } from 'uuid';

export const createDefaultTestData = async (
  prisma: PrismaService,
  args = {
    user: {
      data: { id: USER_ID, email: 'test@test.com' },
    },
    tenant: {
      data: { id: TENANT_ID, name: 'Hello', subscriptionType: 'basic' },
    },
    project: {
      preferences: {
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
      },
      defaultExtraFields: {
        status: {
          type: CustomFieldType.DROPDOWN,
          fieldItems: [
            {
              id: uuid(),
              name: 'Backlog',
              visibility: true,
              position: 0,
            },
            {
              id: uuid(),
              name: 'Todo',
              visibility: true,
              position: 1,
            },
            {
              id: uuid(),
              name: 'Doing',
              visibility: true,
              position: 2,
            },
            {
              id: uuid(),
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
              id: uuid(),
              name: 'Urgent',
              visibility: true,
              position: 0,
            },
            {
              id: uuid(),
              name: 'High',
              visibility: true,
              position: 1,
            },
            {
              id: uuid(),
              name: 'Normal',
              visibility: true,
              position: 2,
            },
            {
              id: uuid(),
              name: 'Low',
              visibility: true,
              position: 3,
            },
          ],
        },
      },
      genericView: {
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
      },
    },
  },
) => {
  const user = await createUser(prisma, args);
  const tenant = await createTenant(prisma, args);

  const project = await prisma.project.create({
    data: {
      id: PROJECT_ID,
      name: 'hello',
      userId: user.id,
      tenantId: tenant.id,
      // any to silent prisma error for json value
      customFields: args.project.defaultExtraFields as any,
      additionalInformation: {},
      preferences: args.project.preferences as unknown as Prisma.JsonValue,
      views: {
        create: {
          name: args.project.genericView.name,
          filters: args.project.genericView
            .filters as unknown as Prisma.JsonValue,
          groupings: args.project.genericView.groupings,
        },
      },
    },
  });

  return { tenant, project };
};

export const createUser = async (prisma: PrismaService, args) => {
  const user = await prisma.user.create(args.user);

  return user;
};

export const createTenant = async (prisma: PrismaService, args) => {
  const tenant = await prisma.tenant.create(args.tenant);

  return tenant;
};
