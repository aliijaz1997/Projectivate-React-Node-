import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsISO8601,
  IsOptional,
  IsNumber,
  IsObject,
} from 'class-validator';
import { TaskCustomFields } from '../entities/task.entity';
export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  assigneeId?: string;

  @ApiProperty()
  @IsISO8601()
  dateStart: string;

  @ApiProperty()
  @IsISO8601()
  dateEnd: string;

  @ApiProperty()
  @IsObject()
  customFields: TaskCustomFields;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  position: number;

  @ApiProperty()
  parentId?: string;
}

export class TasksResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  assigneeId: string;

  @ApiProperty()
  dateStart: string;

  @ApiProperty()
  dateEnd: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  position: number;
}
