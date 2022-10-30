import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum SprintSpan {
  ONE_WEEK = '1 Week',
  TWO_WEEKS = '2 Weeks',
  THREE_WEEKS = '3 Weeks',
  FOUR_WEEKS = '4 Weeks',
}

export class CreateSprintDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ enum: [Object.values(SprintSpan)] })
  @IsEnum(SprintSpan)
  @IsNotEmpty()
  sprintSpan: SprintSpan;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  majorTargets: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  minorTargets: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  customField?: string;
}
