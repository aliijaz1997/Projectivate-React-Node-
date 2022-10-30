import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEnum, IsArray, IsBoolean } from 'class-validator';
import {
  Condition,
  Operation,
  FilterTaskDto as IFiterTaskDto,
  FilterRule as IFilterValues,
} from '@projectivate/common';

export class FilterTaskDto implements IFiterTaskDto {
  @ApiProperty()
  @IsEnum(Operation)
  op: Operation;

  @ApiProperty()
  @IsArray()
  @Type(() => FilterValues)
  fields: FilterValues[];

  @ApiProperty()
  @IsString()
  search: string;

  @ApiProperty()
  @IsBoolean()
  searchName: boolean;

  @ApiProperty()
  @IsBoolean()
  searchDescription: boolean;
}

export class FilterValues implements IFilterValues {
  @ApiProperty()
  @IsString()
  field: string;

  @ApiProperty()
  @IsString()
  op: Condition;

  @ApiProperty()
  @IsString()
  value: string;
}
