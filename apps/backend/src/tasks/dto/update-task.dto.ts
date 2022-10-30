import { PartialType } from '@nestjs/swagger';
import { TaskPositionDto } from '@projectivate/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
export class UpdateTaskPositionDto implements TaskPositionDto {
  @IsNotEmpty()
  @IsString()
  taskId: string;

  @IsNotEmpty()
  @IsNumber()
  position: number;
}
