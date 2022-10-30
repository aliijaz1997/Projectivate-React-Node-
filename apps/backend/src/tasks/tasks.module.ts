import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { CommentGateway } from './comment.gateway';
import { TaskGateway } from './task.gateway';

@Module({
  controllers: [TasksController],
  providers: [TasksService, CommentGateway, TaskGateway],
})
export class TasksModule {}
