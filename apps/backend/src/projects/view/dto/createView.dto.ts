import { ApiProperty } from '@nestjs/swagger';
import { CreateViewDto, FilterTaskDto, ViewGroup } from '@projectivate/common';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDto implements CreateViewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  filters: FilterTaskDto;

  @ApiProperty()
  @IsNotEmpty()
  groupings: ViewGroup;
}
