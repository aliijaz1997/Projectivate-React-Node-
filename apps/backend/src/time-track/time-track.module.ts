import { Module } from '@nestjs/common';
import { TimeTrackService } from './time-track.service';
import { TimeTrackController } from './time-track.controller';

@Module({
  controllers: [TimeTrackController],
  providers: [TimeTrackService],
})
export class TimeTrackModule {}
