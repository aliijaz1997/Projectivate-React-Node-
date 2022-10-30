import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { FirebaseAdminService } from '../common/services/firebase-admin/firebase-admin.service';
import { TimeTrackController } from './time-track.controller';
import { TimeTrackService } from './time-track.service';
import { ConfigService } from '@nestjs/config';

describe('TimeTrackController', () => {
  let controller: TimeTrackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeTrackController],
      providers: [
        TimeTrackService,
        FirebaseAdminService,
        PrismaService,
        ConfigService,
      ],
    }).compile();

    controller = module.get<TimeTrackController>(TimeTrackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
