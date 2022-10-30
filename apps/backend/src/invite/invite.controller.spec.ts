import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from '../common/services/email/email.service';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { InviteController } from './invite.controller';
import { InviteService } from './invite.service';

describe('InviteController', () => {
  let controller: InviteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InviteController],
      providers: [InviteService, ConfigService, PrismaService, EmailService],
    }).compile();

    controller = module.get<InviteController>(InviteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
