import { Test, TestingModule } from '@nestjs/testing';
import { USER_ID } from '../../test/utils/constants';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { TenantsService } from './tenants.service';
import { dropDatabase } from '../../test/utils/drop-database';
import { FirebaseAdminService } from '../common/services/firebase-admin/firebase-admin.service';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { createDefaultTestData } from '../../test/utils/create-default-test-data';

describe('Task service', () => {
  let service: TenantsService;
  let prisma: PrismaService;
  jest.mock('firebase-admin', () => {
    return {
      auth: jest.fn(),
    };
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantsService,
        PrismaService,
        FirebaseAdminService,
        ConfigService,
      ],
    })
      .overrideProvider(FirebaseAdminService)
      .useValue(admin)
      .compile();

    service = module.get<TenantsService>(TenantsService);

    prisma = module.get<PrismaService>(PrismaService);
  });
  beforeEach(async () => {
    await createDefaultTestData(prisma);
  });
  afterEach(async () => {
    await dropDatabase(prisma);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create tenant and tenant to user', async () => {
    await service.create({ name: 'Hello' }, USER_ID);
    const tenants = await prisma.tenant.findMany();
    const tenantsToUsers = await prisma.tenantsToUsers.findMany();

    expect(tenants.length).toBeGreaterThan(0);
    expect(tenants[0]).toHaveProperty('name', 'Hello');
    expect(tenantsToUsers.length).toBeGreaterThan(0);
  });

  it('should return all the tenants of the user', async () => {
    await service.create({ name: 'Tom' }, USER_ID);
    const tenantsOfUser = await service.findAllTenantsByUserId(USER_ID);
    expect(tenantsOfUser.length).toBeGreaterThan(0);
  });

  it('should return the required tenant', async () => {
    const createdTenant = await service.create({ name: 'Tom' }, USER_ID);
    const findTenant = await service.findOne({ id: createdTenant.id });

    expect(findTenant).toBeTruthy();
  });

  it.skip('should return all the users of tenant', async () => {
    const createdTenant = await service.create({ name: 'Tom' }, USER_ID);
    (admin.auth as jest.Mocked<any>).mockReturnValueOnce({
      getUsers: [
        {
          email: 'test@test.com',
          uid: USER_ID,
          emailVerified: true,
        },
      ],
    });
    const allMembersOfTenant = await service.findMembersByTenantId(
      createdTenant.id,
    );

    expect(allMembersOfTenant.length).toBeGreaterThan(0);
  });
});
