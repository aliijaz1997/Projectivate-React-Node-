import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { CustomFieldType } from '../entities/project.entity';
export class CreateCustomDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEnum(CustomFieldType)
  @IsNotEmpty()
  type: CustomFieldType;
}

export class CreateCustomFieldItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  color?: string;
}
