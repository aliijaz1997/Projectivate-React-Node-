import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async registerUser(
    registerRequest: {
      email: string;
      userId: string;
    },
    tenantId?: string,
  ) {
    const { email, userId } = registerRequest;

    if (!tenantId) {
      const user = await this.prisma.user.create({
        data: { email, id: userId },
      });
      return user;
    }

    const invitation = await this.prisma.invite.findUnique({
      where: { email },
    });

    if (invitation) {
      const addUser = this.prisma.user.create({
        data: { email, id: userId },
      });
      const addTenantToUser = this.prisma.tenantsToUsers.create({
        data: { tenantId, userId: userId },
      });

      await this.prisma.$transaction([addUser, addTenantToUser]);
      return addUser;
    }

    throw new BadRequestException();
  }
}
