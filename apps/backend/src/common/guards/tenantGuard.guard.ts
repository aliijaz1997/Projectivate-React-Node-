import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../services/prisma/prisma.service';
import { IS_PUBLIC_KEY_Tenant } from './publictenant.guard';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private prisma: PrismaService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY_Tenant,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }
    const request = await context.switchToHttp().getRequest();
    const userId = await request.user?.sub;
    const tenantId = await request.cookies?.tenantId;
    if (!tenantId || !userId) {
      return false;
    }
    const tenantUser = await this.prisma.tenantsToUsers.findUnique({
      where: {
        tenantId_userId: {
          tenantId,
          userId,
        },
      },
    });
    if (!tenantUser) {
      return false;
    }

    return true;
  }
}
