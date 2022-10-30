import {
  Controller,
  Post,
  Body,
  Param,
  Logger,
  Get,
  Delete,
  Patch,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateCustomDto,
  CreateCustomFieldItemDto,
} from './dto/create-custom.dto';
import { CustomFieldService } from './customfield.service';
import { UpdateCustomFieldItemDto } from './dto/update-custom.dto';
import { TaskCustomFields } from 'src/tasks/entities/task.entity';
import { DeleteCustomFieldDto } from './dto/delete-customfield.dto';
import { GetUserId } from 'src/auth/get-user-decorator';

@ApiBearerAuth()
@ApiTags('CustomFields')
@Controller('projects/:projectId')
export class CustomFieldController {
  private logger = new Logger(CustomFieldController.name);
  constructor(private readonly customFieldService: CustomFieldService) {}

  @Post('customFields')
  async create(
    @Body() createCustomDto: CreateCustomDto,
    @Param('projectId') projectId: string,
  ) {
    return await this.customFieldService.createCustomField(
      createCustomDto,
      projectId,
    );
  }

  @Post('customFields/:field/fieldItems')
  async createFieldItem(
    @Param('projectId') projectId: string,
    @Param('field') field: string,
    @Body() createSubFieldDto: CreateCustomFieldItemDto,
  ) {
    return await this.customFieldService.createFieldItem({
      projectId,
      field,
      createCustomFieldItemDto: createSubFieldDto,
    });
  }

  @Patch('customFields/:field/fieldItems/:fieldItemId')
  async updateFieldItem(
    @Param('projectId') projectId: string,
    @Param('field') field: string,
    @Param('fieldItemId') fieldItemId: string,
    @Body() updateCustomFieldItemDto: UpdateCustomFieldItemDto,
  ) {
    return await this.customFieldService.updateCustomFieldItem({
      projectId,
      field,
      fieldItemId,
      updateCustomFieldItemDto,
    });
  }

  @Delete('customFields/:field/fieldItems/:fieldItemId')
  async deleteFieldItem(
    @Param('projectId') projectId: string,
    @Param('field') field: string,
    @Param('fieldItemId') fieldItemId: string,
    @Body() body: DeleteCustomFieldDto,
  ) {
    const { keepTasks } = body;
    return await this.customFieldService.deleteCustomFieldItem({
      projectId,
      field,
      fieldItemId,
      keepTasks,
    });
  }

  @Post('tasks/:taskId/customFields/:field/fieldItems/:fieldItemId')
  async assignFieldItemToTask(
    @Param('projectId') projectId: string,
    @Param('field') field: string,
    @Param('fieldItemId') fieldItemId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.customFieldService.assignCustomFieldToTask({
      projectId,
      field,
      fieldItemId,
      taskId,
    });
  }

  @Put('tasks/:taskId/customFields')
  async updateManyFieldItemsOnTask(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Body() updateManyTaskFields: TaskCustomFields,
    @GetUserId() userId: string,
  ) {
    return this.customFieldService.updateManyFieldItemsOnTask({
      taskCustomFieldsDto: updateManyTaskFields,
      taskId,
      projectId,
      userId,
    });
  }

  @Delete('tasks/:taskId/customFields/:field/fieldItems/:fieldItemId')
  async removeFieldItemFromTask(
    @Param('field') field: string,
    @Param('projectId') projectId: string,
    @Param('fieldItemId') fieldItemId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.customFieldService.removeFieldItemFromTask({
      field,
      fieldItemId,
      taskId,
      projectId,
    });
  }

  @Delete('customFields/:field')
  async deleteCustomField(
    @Param('field') field: string,
    @Param('projectId') projectId: string,
  ) {
    return this.customFieldService.deleteCustomField({
      field,
      projectId,
    });
  }

  @Get('customFields')
  async listOfCustomFields(@Param('projectId') projectId: string) {
    return this.customFieldService.listOfCustomFields(projectId);
  }

  @Get('customFields/:field/fieldItems')
  async listOfCustomFieldItems(
    @Param('projectId') projectId: string,
    @Param('field') field: string,
  ) {
    return this.customFieldService.listOfCustomFieldItems(projectId, field);
  }

  @Get('tasks/:taskId/customFields')
  async listOfTasksCustomFieldItems(@Param('taskId') taskId: string) {
    return this.customFieldService.listOfTasksCustomField({
      taskId,
    });
  }
}
