import { Controller, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetTenantId } from '../common/decorators/gettenantid.decorator';
import { GetUserId } from '../auth/get-user-decorator';
import { AttachCardDto } from './dto/attachCard.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateSubscriptionDto } from './dto/CreateSubscription.dto';
import { PaymentService } from './payment.service';
@ApiBearerAuth()
@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('createpayment')
  create(
    @Body() createPaymentDto: CreatePaymentDto,
    @GetUserId() userId: string,
  ) {
    const { stripeTokenId } = createPaymentDto;
    return this.paymentService.create(stripeTokenId, userId);
  }
  @Post('subscription')
  createMonthlySubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @GetUserId() userId: string,
    @GetTenantId() tenantId: string,
  ) {
    const { stripeTokenId, subcriptionType } = createSubscriptionDto;

    return this.paymentService.createMonthlySubscription(
      userId,
      stripeTokenId,
      subcriptionType,
      tenantId,
    );
  }

  @Post('addcreditcard')
  attachCreditCard(@Body() attachCardDto: AttachCardDto) {
    return this.paymentService.attachCreditCard(attachCardDto);
  }

  @Post('createcustomer')
  createCustomer(@GetUserId() userId: string) {
    return this.paymentService.createCustomer(userId);
  }
  @Post('setdefaultcard')
  setDefaultCard(@Body() setDefaultCardDto: AttachCardDto) {
    const { customerId, paymentMethodId } = setDefaultCardDto;
    return this.paymentService.setDefaultCreditCard(
      customerId,
      paymentMethodId,
    );
  }
}
