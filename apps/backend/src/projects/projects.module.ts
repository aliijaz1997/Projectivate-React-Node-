import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectGateway } from './project.gateway';
import { CustomFieldController } from './customfield.controller';
import { CustomFieldService } from './customfield.service';
import { SprintsService } from './sprints/sprints.service';
import { SprintsController } from './sprints/sprints.controller';
import { TaskLogService } from './taskLog.service';
import { TaskLogController } from './taskLog.controller';
import { ViewService } from './view/view.service';
import { ViewController } from './view/view.controller';

@Module({
  controllers: [
    ProjectsController,
    CustomFieldController,
    SprintsController,
    TaskLogController,
    ViewController,
  ],
  providers: [
    ProjectsService,
    ProjectGateway,
    CustomFieldService,
    SprintsService,
    TaskLogService,
    ViewService,
  ],
})
export class ProjectsModule {}
