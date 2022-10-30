import { ApiProperty } from '@nestjs/swagger';

export class AttachCardDto {
  @ApiProperty()
  paymentMethodId: string;
  @ApiProperty()
  customerId: string;
}
