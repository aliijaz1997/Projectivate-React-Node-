import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class SocketUserService {
  constructor(
    private prisma: PrismaService,
    private firebaseService: FirebaseAdminService,
  ) {}

  async getUserFromSocket(socket: Socket) {
    const token = socket.handshake.headers.authorization;
    if (token && token !== null && token !== '') {
      try {
        const decodedToken = await this.firebaseService.firebase
          .auth()
          .verifyIdToken(token.replace('Bearer ', ''));

        return {
          sub: decodedToken.sub,
          email: decodedToken.email,
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    return null;
  }
}
