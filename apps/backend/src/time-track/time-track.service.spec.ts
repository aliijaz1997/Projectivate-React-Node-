import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { FirebaseAdminService } from '../common/services/firebase-admin/firebase-admin.service';
import { TimeTrackService } from './time-track.service';
import { ConfigService } from '@nestjs/config';

describe('TimeTrackService', () => {
  let service: TimeTrackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimeTrackService,
        FirebaseAdminService,
        PrismaService,
        ConfigService,
      ],
    }).compile();

    service = module.get<TimeTrackService>(TimeTrackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
