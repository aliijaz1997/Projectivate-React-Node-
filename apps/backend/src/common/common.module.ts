import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EmailService } from './services/email/email.service';
import { TenantGuard } from './guards/tenantGuard.guard';
import { PrismaService } from './services/prisma/prisma.service';
import { UserService } from './services/user/user.service';
import { PreauthGuard } from './auth/preauth.guard';
import { FirebaseAdminService } from './services/firebase-admin/firebase-admin.service';
import { SocketUserService } from './services/user/getUserFromSocket.service';

@Global()
@Module({
  providers: [
    PrismaService,
    FirebaseAdminService,
    SocketUserService,
    EmailService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: PreauthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: TenantGuard,
    },
  ],
  exports: [
    PrismaService,
    UserService,
    FirebaseAdminService,
    SocketUserService,
  ],
})
export class CommonModule {}
