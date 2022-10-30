import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { v4 as uuidv4 } from 'uuid';
import { Tenant } from '@prisma/client';
import { FirebaseAdminService } from '../common/services/firebase-admin/firebase-admin.service';

@Injectable()
export class TenantsService {
  constructor(
    private prisma: PrismaService,
    private readonly firebaseAdmin: FirebaseAdminService,
  ) {}
  async create(createTenantDto: CreateTenantDto, userId: string) {
    const { name } = createTenantDto;
    const tenantId = uuidv4();
    const newTenant = this.prisma.tenant.create({
      data: { name, id: tenantId, subscriptionType: 'basic' },
    });

    const addedUser = this.prisma.tenantsToUsers.create({
      data: { tenantId, userId },
    });

    const [tenant] = await this.prisma.$transaction([newTenant, addedUser]);
    return tenant;
  }

  async addUserToTenant(id: string, userId: string) {
    return await this.prisma.tenantsToUsers.create({
      data: { tenantId: id, userId },
    });
  }
  async findAllTenantsByUserId(userId: string): Promise<Tenant[]> {
    return await this.prisma.tenant.findMany({
      where: { users: { some: { userId } } },
    });
  }
  async findAssigneeInTask(assigneeId: string) {
    const assignees = await this.prisma.user.findMany({
      where: { id: assigneeId },
    });
    const members = await this.firebaseAdmin.firebase
      .auth()
      .getUsers([...assignees.map((a) => ({ email: a.email }))]);
    const assignee = members.users.map((m) => {
      return {
        id: m.uid,
        email: m.email,
        displayName: m.displayName,

        createdAt: new Date(m.metadata.creationTime),
        updatedAt: new Date(m.metadata.lastSignInTime),
      };
    });
    return assignee[0];
  }

  async findOne(TenantWhereUniqueInput: Prisma.TenantWhereUniqueInput) {
    return await this.prisma.tenant.findUnique({
      where: TenantWhereUniqueInput,
    });
  }

  async findMembersByTenantId(tenantId: string) {
    const users = await this.prisma.user.findMany({
      where: {
        tenants: {
          some: {
            tenantId,
          },
        },
      },
    });
    const members = await this.firebaseAdmin.firebase
      .auth()
      .getUsers([...users.map((u) => ({ email: u.email }))]);

    return members.users.map((m) => {
      return {
        id: m.uid,
        email: m.email,
        displayName: m.displayName,

        createdAt: new Date(m.metadata.creationTime),
        updatedAt: new Date(m.metadata.lastSignInTime),
      };
    });
  }

  async remove(where: Prisma.TenantWhereUniqueInput) {
    return await this.prisma.tenant.delete({
      where,
    });
  }

  async removeUserFromTenant(id: string, userId: string) {
    return await this.prisma.tenantsToUsers.delete({
      where: {
        tenantId_userId: {
          tenantId: id,
          userId,
        },
      },
    });
  }
}
