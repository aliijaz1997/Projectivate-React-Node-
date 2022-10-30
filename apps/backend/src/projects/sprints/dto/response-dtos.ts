import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/tasks/entities/task.entity';
import { SprintSpan } from './create-sprint.dto';

export class SprintResDto {
  constructor(sprint: SprintResDto) {
    Object.assign(this, sprint);
  }
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  majorTargets: string;

  @ApiProperty({ enum: [Object.values(SprintSpan)] })
  sprintSpan: SprintSpan;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  minorTargets: string;

  @ApiProperty()
  customField?: string;

  @ApiProperty()
  tasks: Task[];
}

export class CreateSprintResDto extends OmitType(SprintResDto, [
  'tasks',
] as const) {
  constructor(createSprint: CreateSprintResDto) {
    super(createSprint);
  }
}

export class UpdateSprintResDto extends OmitType(SprintResDto, [
  'tasks',
] as const) {
  constructor(createSprint: CreateSprintResDto) {
    super(createSprint);
  }
}
