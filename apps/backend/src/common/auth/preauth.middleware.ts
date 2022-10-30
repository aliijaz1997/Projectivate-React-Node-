import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { FirebaseAdminService } from '../services/firebase-admin/firebase-admin.service';
import { PrismaService } from '../services/prisma/prisma.service';

type JwtUser = {
  email: string;
  sub: string;
};

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseService: FirebaseAdminService,
  ) {}
  use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization;
    if (token && token !== null && token !== '') {
      this.firebaseService.firebase
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          const userExists = await this.prisma.user.findUnique({
            where: {
              email: decodedToken.email,
            },
          });

          if (!userExists) {
            await this.prisma.user.create({
              data: {
                email: decodedToken.email,
                id: decodedToken.sub,
              },
            });
          }

          const user: JwtUser = {
            email: decodedToken.email,
            sub: decodedToken.sub,
          };

          req['user'] = user;
          next();
        })
        .catch((error) => {
          console.error(error);
          next();
        });
    } else {
      next();
    }
  }
}
