import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import {
  CreateCustomDto,
  CreateCustomFieldItemDto,
} from './dto/create-custom.dto';
import { UpdateCustomFieldItemDto } from './dto/update-custom.dto';
import { v4 as uuid4 } from 'uuid';
import { removeEmptyValuesFromObject } from '../../src/utils/remove-empty-values-form-object';
import {
  CustomField,
  CustomFieldItem,
  CustomFieldType,
  ProjectCustomFields,
} from './entities/project.entity';
import { TaskCustomFields } from '../../src/tasks/entities/task.entity';
import { TaskLogService } from './taskLog.service';

export const statusCustomFieldKey = 'status';
export const categoryCustomFieldKey = 'category';

@Injectable()
export class CustomFieldService {
  constructor(
    private prisma: PrismaService,
    private taskLogService: TaskLogService,
  ) {}

  async listOfCustomFields(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    const customFields = project.customFields as unknown as ProjectCustomFields;
    return customFields;
  }

  async listOfCustomFieldItems(projectId: string, field: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    const customFieldItem = project.customFields[field] as CustomField;
    return customFieldItem.fieldItems;
  }

  async createCustomField(
    createCustomFieldDto: CreateCustomDto,
    projectId: string,
  ) {
    const { name, type } = createCustomFieldDto;

    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    const previousCustomFields =
      project.customFields as unknown as ProjectCustomFields;

    const alreadyExists = Object.keys(previousCustomFields).find(
      (key) => key === name,
    );

    if (alreadyExists) {
      throw new BadRequestException(
        'The name already exist, try with another.',
      );
    }

    const updatedCustomFields: ProjectCustomFields = {
      ...previousCustomFields,
      [name]: {
        type,
        fieldItems: [],
      },
    };

    return await this.prisma.project.update({
      where: { id: projectId },
      data: {
        customFields: updatedCustomFields as unknown as Prisma.JsonObject,
      },
    });
  }

  async createFieldItem({
    projectId,
    field,
    createCustomFieldItemDto,
  }: {
    projectId: string;
    field: string;
    createCustomFieldItemDto: CreateCustomFieldItemDto;
  }) {
    const { name, color } = createCustomFieldItemDto;
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) throw new NotFoundException('Project Not found');

    const allCustomFields =
      project.customFields as unknown as ProjectCustomFields;

    const customField = allCustomFields[field];

    if (!customField) throw new NotFoundException('Custom Field not found');

    const newFieldItem: CustomFieldItem = {
      id: uuid4(),
      name,
      color,
      position: customField.fieldItems.length + 1,
      visibility: true,
    };

    const sanitizedFieldItem = removeEmptyValuesFromObject(newFieldItem);

    const updatedCustomFields: ProjectCustomFields = {
      ...allCustomFields,
      [field]: {
        ...customField,
        fieldItems: [
          ...customField.fieldItems,
          sanitizedFieldItem as unknown as CustomFieldItem,
        ],
      },
    };

    return await this.prisma.project.update({
      where: { id: projectId },
      data: {
        customFields: updatedCustomFields as unknown as Prisma.JsonObject,
      },
    });
  }

  async deleteCustomField({
    field,
    projectId,
  }: {
    field: string;
    projectId: string;
  }) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    const updatedProjectCustomFields = Object.fromEntries(
      Object.entries(project.customFields).filter(([key]) => key !== field),
    );

    return await this.prisma.project.update({
      where: { id: projectId },
      data: { customFields: updatedProjectCustomFields },
    });
  }

  async deleteCustomFieldItem({
    field,
    projectId,
    fieldItemId,
    keepTasks,
  }: {
    field: string;
    fieldItemId: string;
    projectId: string;
    keepTasks: boolean;
  }) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    const allProjectFields =
      project.customFields as unknown as ProjectCustomFields;
    const projectCustomField = allProjectFields[field];
    const updatedFields = projectCustomField.fieldItems.filter(
      (item) => item.id !== fieldItemId,
    );
    const updatedProjectCustomFields: ProjectCustomFields = {
      ...allProjectFields,
      [field]: {
        ...allProjectFields[field],
        fieldItems: updatedFields,
      },
    };
    if (!keepTasks) {
      const deleteTasks = this.prisma.task.deleteMany({
        where: {
          customFields: {
            path: [field],
            equals: fieldItemId,
          },
        },
      });
      const updateProject = this.prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          customFields:
            updatedProjectCustomFields as unknown as Prisma.JsonObject,
        },
      });

      return await this.prisma.$transaction([deleteTasks, updateProject]);
    }

    const untitledFieldield = projectCustomField.fieldItems.find(
      (f) => f.name === 'Untitled',
    );
    if (!untitledFieldield) {
      const newFieldItemId = uuid4();
      const newFieldItem: CustomFieldItem = {
        id: newFieldItemId,
        name: 'Untitled',
        position: projectCustomField.fieldItems.length + 1,
        visibility: true,
      };
      const sanitizedFieldItem = removeEmptyValuesFromObject(newFieldItem);

      const updatedCustomFields: ProjectCustomFields = {
        ...updatedProjectCustomFields,
        [field]: {
          ...projectCustomField,
          fieldItems: [
            ...updatedFields,
            sanitizedFieldItem as unknown as CustomFieldItem,
          ],
        },
      };
      const updateTasks = this.prisma.$executeRawUnsafe(
        `UPDATE "Task" SET "customFields"['${field}'] = '"${newFieldItemId}"' where "customFields"-> '${field}' = '"${fieldItemId}"'`,
      );
      const projectUpdate = this.prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          customFields: updatedCustomFields as unknown as Prisma.JsonObject,
        },
      });
      return await this.prisma.$transaction([updateTasks, projectUpdate]);
    }

    const taskUpdate = this.prisma.$executeRawUnsafe(
      `UPDATE "Task" SET "customFields"['${field}'] = '"${untitledFieldield.id}"' where "customFields"-> '${field}' = '"${fieldItemId}"'`,
    );
    const projectUpdate = this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        customFields:
          updatedProjectCustomFields as unknown as Prisma.JsonObject,
      },
    });
    return await this.prisma.$transaction([taskUpdate, projectUpdate]);
  }

  async updateCustomFieldItem({
    field,
    projectId,
    fieldItemId,
    updateCustomFieldItemDto,
  }: {
    field: string;
    fieldItemId: string;
    projectId: string;
    updateCustomFieldItemDto: UpdateCustomFieldItemDto;
  }) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    const allCustomFields =
      project.customFields as unknown as ProjectCustomFields;

    const customFieldToBeUpdated = allCustomFields[field];

    if (!customFieldToBeUpdated) throw new NotFoundException('Field not found');
    if (field === 'status') {
      const restrictedItem1 = customFieldToBeUpdated.fieldItems.find(
        (item) => item.name === 'Todo',
      );
      const restrictedItem2 = customFieldToBeUpdated.fieldItems.find(
        (item) => item.name === 'Done',
      );
      if (fieldItemId === restrictedItem1.id) {
        throw new BadRequestException(
          'The name of this field item cannot be changed',
        );
      }
      if (fieldItemId === restrictedItem2.id) {
        throw new BadRequestException(
          'The name of this field item cannot be changed',
        );
      }
    }
    const updatedCustomFieldItems: CustomFieldItem[] =
      customFieldToBeUpdated.fieldItems.map((item) => {
        if (item.id === fieldItemId) {
          return {
            ...item,
            ...updateCustomFieldItemDto,
          };
        }
        return item;
      });

    const updatedProjectCustomFields: ProjectCustomFields = {
      ...allCustomFields,
      [field]: {
        ...customFieldToBeUpdated,
        fieldItems: updatedCustomFieldItems,
      },
    };

    return await this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        customFields:
          updatedProjectCustomFields as unknown as Prisma.JsonObject,
      },
    });
  }

  async listOfTasksCustomField({ taskId }: { taskId: string }) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    const taskCustomField = task.customFields as unknown as TaskCustomFields;
    return taskCustomField;
  }

  async assignCustomFieldToTask({
    projectId,
    field,
    fieldItemId,
    taskId,
  }: {
    projectId: string;
    field: string;
    fieldItemId: string;
    taskId: string;
  }) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    const projectCustomField = project.customFields[field] as CustomField;

    if (!projectCustomField)
      throw new NotFoundException('Custom Field Not found');

    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    if (!task) throw new NotFoundException('Task not found');

    const assignedCustomFields =
      task.customFields as unknown as TaskCustomFields;

    // a specific from all the custom fields assigned to task
    const taskCustomField = assignedCustomFields[field];

    // update selected custom field in the tasks. This is for the checkbox case.
    const updatedFieldItems = taskCustomField
      ? [...taskCustomField, fieldItemId]
      : [fieldItemId];

    const updatedAssignedCustomFields: TaskCustomFields = {
      ...assignedCustomFields,
      // depeding on whether its type, add or update the field.
      [field]:
        projectCustomField.type === CustomFieldType.CHECKBOX
          ? updatedFieldItems
          : fieldItemId,
    };

    return await this.prisma.task.update({
      where: { id: taskId },
      data: { customFields: updatedAssignedCustomFields },
    });
  }

  async updateManyFieldItemsOnTask({
    taskId,
    taskCustomFieldsDto,
    projectId,
    userId,
  }: {
    taskId: string;
    projectId: string;
    userId: string;
    taskCustomFieldsDto: TaskCustomFields;
  }) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    const allProjectFields =
      project.customFields as unknown as ProjectCustomFields;
    await this.taskLogService.create({
      allProjectFields,
      taskId,
      userId,
      taskCustomFieldsDto,
    });
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    if (!task) throw new NotFoundException('Task not found');
    const assignedCustomFields =
      task.customFields as unknown as TaskCustomFields;

    const updatedAssignedCustomFields: TaskCustomFields = {
      ...assignedCustomFields,
      ...taskCustomFieldsDto,
    };

    const sanitizedUpdatedFields = removeEmptyValuesFromObject(
      updatedAssignedCustomFields,
    );

    return await this.prisma.task.update({
      where: { id: taskId },
      data: { customFields: sanitizedUpdatedFields },
    });
  }

  async removeFieldItemFromTask({
    field,
    fieldItemId,
    taskId,
    projectId,
  }: {
    projectId: string;
    field: string;
    fieldItemId: string;
    taskId: string;
  }) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    const projectCustomField = project.customFields[
      field
    ] as unknown as CustomField;

    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    const assignedCustomFields =
      task.customFields as unknown as TaskCustomFields;

    const previousTaskField = assignedCustomFields[field];

    // If the type of custom field is checkbox then filter through the array and remove the id with matching id.
    // Otherwise assign undefined to the field
    const updatedAssignedCustomFields: TaskCustomFields = {
      ...assignedCustomFields,
      [field]:
        projectCustomField.type === CustomFieldType.CHECKBOX
          ? (previousTaskField as string[]).filter((f) => f !== fieldItemId)
          : undefined,
    };

    // remove all the empty values. If the value is undefined from above, then it will be removed from this step.
    const sanitizedUpdatedCustomFields = removeEmptyValuesFromObject(
      updatedAssignedCustomFields,
    );

    return await this.prisma.task.update({
      where: { id: taskId },
      data: { customFields: sanitizedUpdatedCustomFields },
    });
  }
}
