import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateViewPreferencesDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  horizontalField?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  verticalField?: string;
}
