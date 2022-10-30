import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty()
  stripeTokenId: string;

  @ApiProperty()
  subcriptionType: string;
}
