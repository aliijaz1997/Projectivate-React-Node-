import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateTimeTrackDto {
  @ApiProperty()
  @IsOptional()
  startTime: Date;

  @ApiProperty()
  @IsOptional()
  endTime?: Date;
}
