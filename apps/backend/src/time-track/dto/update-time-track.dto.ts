import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsISO8601 } from 'class-validator';
import { CreateTimeTrackDto } from './create-time-track.dto';

export class UpdateTimeTrackDto extends PartialType(CreateTimeTrackDto) {}
