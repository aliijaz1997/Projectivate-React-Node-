import { Tenant as PrismaTenant } from '@prisma/client';

export class Tenant implements PrismaTenant {
  id: string;
  name: string;
  subscriptionType: string;
}
