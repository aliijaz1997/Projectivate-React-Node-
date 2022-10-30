import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { FirebaseAdminService } from '../services/firebase-admin/firebase-admin.service';

@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = await context.switchToWs().getClient<Socket>();

    const token = await client.handshake.headers.authorization;

    if (token && token !== null && token !== '') {
      try {
        await this.firebaseAdminService.firebase
          .auth()
          .verifyIdToken(token.replace('Bearer ', ''));

        return true;
      } catch (error) {
        console.error(error);
        client.emit('error:unauthorized', {
          message: 'user not authorized',
        });
        return false;
      }
    }

    return false;
  }
}
