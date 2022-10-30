import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { CustomFieldType } from '../entities/project.entity';
export class UpdateCustomDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEnum(CustomFieldType)
  @IsNotEmpty()
  type: CustomFieldType;
}

export class UpdateCustomFieldItemDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  visibility?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  position?: number;
}
