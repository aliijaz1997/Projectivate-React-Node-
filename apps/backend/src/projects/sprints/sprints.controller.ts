import { Controller, Post, Body, Param, Logger, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { CreateSprintResDto, SprintResDto } from './dto/response-dtos';
import { SprintsService } from './sprints.service';

@ApiBearerAuth()
@ApiTags('Sprints')
@Controller('projects/:projectId')
export class SprintsController {
  private logger = new Logger(SprintsController.name);
  constructor(private readonly sprintsService: SprintsService) {}

  @ApiResponse({
    type: CreateSprintResDto,
    description: 'Create a Sprint',
  })
  @Post('sprints')
  async create(
    @Body() createSprintDto: CreateSprintDto,
    @Param('projectId') projectId: string,
  ): Promise<CreateSprintResDto> {
    return await this.sprintsService.create({
      createSprintDto,
      projectId,
    });
  }

  @ApiResponse({
    type: SprintResDto,
    description: 'Get Current Sprint',
    schema: {
      nullable: true,
    },
  })
  @Get('sprints/current')
  async currentSprint(
    @Param('projectId') projectId: string,
  ): Promise<SprintResDto | null> {
    return await this.sprintsService.getCurrentSprint(projectId);
  }

  @ApiResponse({
    type: [SprintResDto],
    description: 'List of Previous Sprints',
  })
  @Get('sprints/previous')
  async previousSprints(
    @Param('projectId') projectId: string,
  ): Promise<SprintResDto[]> {
    return await this.sprintsService.previousSprints({ projectId });
  }
}
