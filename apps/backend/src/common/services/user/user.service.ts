import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(userInfo: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userInfo,
      },
    });
    return user;
  }
}
