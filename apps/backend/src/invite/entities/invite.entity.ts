import { Invite as PrismaInvite } from '@prisma/client';

export class Invite implements PrismaInvite {
  id: string;
  email: string;
  inviteAccepted: boolean;
  tenantId: string;
  inviteSenderId: string;
}
