import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { CreateSprintDto, SprintSpan } from './dto/create-sprint.dto';
import { CreateSprintResDto, SprintResDto } from './dto/response-dtos';
import * as dayjs from 'dayjs';
import { ProjectCustomFields } from '../entities/project.entity';
import { statusCustomFieldKey } from '../customfield.service';

@Injectable()
export class SprintsService {
  constructor(private readonly prisma: PrismaService) {}
  async create({
    createSprintDto,
    projectId,
  }: {
    createSprintDto: CreateSprintDto;
    projectId: string;
  }): Promise<CreateSprintResDto> {
    const { majorTargets, minorTargets, sprintSpan, startDate, customField } =
      createSprintDto;

    const sprintName = `${startDate}_${sprintSpan}`;
    const endDate = this.calculateEndDate(new Date(startDate), sprintSpan);

    // find if there is any sprint that already exists.
    const sprintExists = await this.getCurrentSprint(projectId);

    if (sprintExists)
      throw new BadRequestException(
        'Cant create a new sprint. Current Sprint Already Exists',
      );

    const sprint = await this.prisma.sprint.create({
      data: {
        majorTargets,
        minorTargets,
        name: sprintName,
        sprintSpan,
        startDate,
        endDate,
        customField,
        projectId,
      },
    });

    return new CreateSprintResDto({
      id: sprint.id,
      majorTargets: sprint.majorTargets,
      minorTargets: sprint.minorTargets,
      sprintSpan: sprint.sprintSpan as SprintSpan,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      name: sprint.name,
      customField: sprint.customField,
    });
  }

  async getCurrentSprint(projectId: string): Promise<SprintResDto | null> {
    const currentDate = new Date();

    const sprint = await this.prisma.sprint.findFirst({
      where: {
        projectId,
        endDate: {
          gte: currentDate,
        },
      },
      include: {
        tasks: true,
      },
    });

    if (!sprint) return null;

    return new SprintResDto({
      id: sprint.id,
      majorTargets: sprint.majorTargets,
      minorTargets: sprint.minorTargets,
      name: sprint.name,
      sprintSpan: sprint.sprintSpan as SprintSpan,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      customField: sprint.customField,
      tasks: sprint.tasks,
    });
  }

  async previousSprints({
    projectId,
  }: {
    projectId: string;
  }): Promise<SprintResDto[]> {
    const today = new Date();

    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });

    const projectCustomFields =
      project.customFields as unknown as ProjectCustomFields;
    const status = projectCustomFields[statusCustomFieldKey].fieldItems.find(
      (item) => item.name === 'Done',
    );

    const sprints = await this.prisma.sprint.findMany({
      where: {
        projectId,
        endDate: {
          lte: today,
        },
      },
      include: {
        tasks: {
          where: {
            NOT: {
              customFields: {
                path: [statusCustomFieldKey],
                equals: status.id,
              },
            },
          },
        },
      },
    });

    return sprints.map(
      (s) =>
        new SprintResDto({
          id: s.id,
          endDate: s.endDate,
          majorTargets: s.majorTargets,
          minorTargets: s.minorTargets,
          name: s.name,
          sprintSpan: s.sprintSpan as SprintSpan,
          startDate: s.startDate,
          tasks: s.tasks,
          customField: s.customField,
        }),
    );
  }

  private calculateEndDate(startDate: Date, sprintSpan: SprintSpan): Date {
    const startDateDayjs = dayjs(startDate);

    if (sprintSpan === SprintSpan.ONE_WEEK) {
      return startDateDayjs.add(1, 'week').toDate();
    }

    if (sprintSpan === SprintSpan.TWO_WEEKS) {
      return startDateDayjs.add(2, 'week').toDate();
    }

    if (sprintSpan === SprintSpan.THREE_WEEKS) {
      return startDateDayjs.add(3, 'week').toDate();
    }

    if (sprintSpan === SprintSpan.FOUR_WEEKS) {
      return startDateDayjs.add(4, 'week').toDate();
    }
  }
}
