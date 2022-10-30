import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { EmailService } from 'src/common/services/email/email.service';

@Module({
  controllers: [InviteController],
  providers: [InviteService, EmailService],
})
export class InviteModule {}
