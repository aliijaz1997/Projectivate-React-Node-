import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Logger,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
  Query,
  Patch,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, ProjectResponse } from './dto/create-project.dto';
import { GetUserId } from '../auth/get-user-decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTenantId } from '../common/decorators/gettenantid.decorator';
import { Project } from '.prisma/client';
import { Task } from '../tasks/entities/task.entity';
import { TasksResponse } from '../tasks/dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateViewPreferencesDto } from './dto/update-preference.dto';

@ApiBearerAuth()
@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  private logger = new Logger(ProjectsController.name);
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiResponse({ description: 'Created Project', type: ProjectResponse })
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @GetUserId() userId: string,
    @GetTenantId() tenantId: string,
  ): Promise<Project> {
    return await this.projectsService.create(
      createProjectDto,
      userId,
      tenantId,
    );
  }

  @Get()
  @ApiResponse({ description: 'List of projects', type: [ProjectResponse] })
  async findAll(@GetTenantId() tenantId: string): Promise<Project[]> {
    return this.projectsService.findAll({ where: { tenantId } });
  }
  @Post(':id/tasks')
  @ApiResponse({
    description: 'List of tasks related to project',
    type: [TasksResponse],
  })
  async filterAllTasksByProjectId(
    @Param('id') id: string,
    @GetTenantId() tenantId: string,
    @Body() filters?: FilterTaskDto,
  ): Promise<Task[]> {
    const tasks = await this.projectsService.findAllTasks({
      projectId: id,
      tenantId,
      filters,
    });

    return tasks;
  }

  @Get(':id')
  @ApiResponse({
    description: 'Fetched Project with the given id',
    type: ProjectResponse,
  })
  async findOneProject(
    @Param('id') id: string,
    @GetTenantId() tenantId: string,
  ): Promise<Project> {
    const project = await this.projectsService.findOne({
      id,
    });
    if (project.tenantId !== tenantId) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  @Patch(':id/preferences/views/:name')
  async updatePreferences(
    @Param() { id, name }: { id: string; name: string },
    @Body() updatePreferencesDto: UpdateViewPreferencesDto,
  ) {
    return this.projectsService.updateViewPreferences(
      id,
      name,
      updatePreferencesDto,
    );
  }

  @Delete(':id')
  @ApiResponse({ description: 'Deleted Project', type: ProjectResponse })
  async remove(
    @Param('id') id: string,
    @GetUserId() userId: string,
    @GetTenantId() tenantId: string,
  ): Promise<Project> {
    const projects = await this.projectsService.findAll({
      where: {
        id,
        tenantId,
      },
    });
    if (projects.length <= 0) {
      throw new NotFoundException('Project not found');
    }
    try {
      if (projects[0].userId !== userId) {
        this.logger.error('Cannot delete project');
        throw new ForbiddenException('You are not authorized to delete');
      }
      return await this.projectsService.remove({ id: id });
    } catch (error) {
      this.logger.error('Internal server error', JSON.stringify(error.message));
      throw new InternalServerErrorException(error.message);
    }
  }
}
