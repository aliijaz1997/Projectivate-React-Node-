import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { ProjectsModule } from './projects/projects.module';

import { ConfigModule } from '@nestjs/config';
import { validationSchemaForEnv } from './config/environment-variables';
import { TasksModule } from './tasks/tasks.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { TenantsModule } from './tenants/tenants.module';
import { PricingModule } from './payment/payment.module';
import { InviteModule } from './invite/invite.module';
import { PreauthMiddleware } from './common/auth/preauth.middleware';
import { TimeTrackModule } from './time-track/time-track.module';

@Module({
  imports: [
    ProjectsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchemaForEnv,
    }),
    TasksModule,
    CommonModule,
    AuthModule,
    TenantsModule,
    PricingModule,
    InviteModule,
    TimeTrackModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
