import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimeTrackService } from './time-track.service';
import { CreateTimeTrackDto } from './dto/create-time-track.dto';
import { UpdateTimeTrackDto } from './dto/update-time-track.dto';
import { GetUserId } from '../auth/get-user-decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetTenantId } from '../common/decorators/gettenantid.decorator';

@ApiBearerAuth()
@ApiTags('TimeTrack')
@Controller('time-track')
export class TimeTrackController {
  constructor(private readonly timeTrackService: TimeTrackService) {}

  @Post('task/:taskId/create')
  create(
    @GetUserId() userId: string,
    @Param('taskId') taskId: string,
    @Body() createTimeTrackDto: CreateTimeTrackDto,
  ) {
    return this.timeTrackService.create({ createTimeTrackDto, userId, taskId });
  }
  @Post('task/:taskId')
  start(
    @GetUserId() userId: string,
    @Param('taskId') taskId: string,
    @Body() createTimeTrackDto: CreateTimeTrackDto,
  ) {
    return this.timeTrackService.start({ createTimeTrackDto, userId, taskId });
  }

  @Get('task/:taskId')
  findAll(@Param('taskId') taskId: string, @GetTenantId() tenantId: string) {
    return this.timeTrackService.findAll({ taskId, tenantId });
  }

  @Patch('task/:taskId')
  stop(
    @GetUserId() userId: string,
    @Param('taskId') taskId: string,
    @Body() updateTimeTrackDto: UpdateTimeTrackDto,
  ) {
    return this.timeTrackService.stop(taskId, updateTimeTrackDto, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeTrackDto: UpdateTimeTrackDto,
    @GetUserId() userId: string,
  ) {
    return this.timeTrackService.update(id, updateTimeTrackDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUserId() userId: string) {
    return this.timeTrackService.remove(id, userId);
  }
}
