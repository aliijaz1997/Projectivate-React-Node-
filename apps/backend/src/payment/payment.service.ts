import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../config/environment-variables';
import { AttachCardDto } from './dto/attachCard.dto';
import { PrismaService } from '../common/services/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    private prismaService: PrismaService,
  ) {
    this.stripe = new Stripe(this.configService.get('SECRET_KEY'), {
      apiVersion: '2020-08-27',
    });
  }
  private stripe = null;
  async create(stripeTokenId: string, userId: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });

      const customer = await this.prismaService.customer.findUnique({
        where: { email: user.email },
      });
      if (!customer) {
        const newCustomer = await this.stripe.customers.create({
          email: user.email,
          description: 'Valueable customer of PM App',
          payment_method: stripeTokenId,
        });
        await this.prismaService.customer.create({
          data: {
            description: newCustomer.description,
            email: newCustomer.email,
            id: newCustomer.id,
          },
        });
        const paymentMethods = await this.stripe.paymentMethods.list({
          customer: '{{CUSTOMER_ID}}',
          type: 'card',
        });
        if (!paymentMethods) {
          await this.attachCreditCard({
            customerId: newCustomer.id,
            paymentMethodId: stripeTokenId,
          });
        }

        const payment = await this.stripe.paymentIntents.create({
          amount: 200,
          currency: 'USD',
          description: 'Your Company Description',
          payment_method: stripeTokenId,
          confirm: true,
          customer: newCustomer.id,
        });
        return payment;
      }
      const payment = await this.stripe.paymentIntents.create({
        amount: 200,
        currency: 'USD',
        description: 'Your Company Description',
        payment_method: stripeTokenId,
        confirm: true,
      });
      return payment;
    } catch (error) {}
  }

  async createMonthlySubscription(
    userId: string,
    stripeTokenId: string,
    subcriptionType: string,
    tenantId: string,
  ) {
    const stripe = new Stripe(this.configService.get('SECRET_KEY'), {
      apiVersion: '2020-08-27',
    });
    let priceId: string;
    if (subcriptionType === 'premium') {
      priceId = this.configService.get('PRIMIUM_PRICE_ID');
    } else {
      priceId = this.configService.get('BUSINESS_PRICE_ID');
    }
    const currentUser = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    const isCustomer = await this.prismaService.customer.findUnique({
      where: { email: currentUser.email },
    });
    if (!isCustomer) {
      const newCustomer = await stripe.customers.create({
        email: currentUser.email,
        description: 'Valueable customer of PM App',
        payment_method: stripeTokenId,
      });
      await this.prismaService.customer.create({
        data: {
          description: newCustomer.description,
          email: newCustomer.email,
          id: newCustomer.id,
        },
      });

      await this.attachCreditCard({
        paymentMethodId: stripeTokenId,
        customerId: newCustomer.id,
      });
      await this.setDefaultCreditCard(stripeTokenId, newCustomer.id);
      const subscription = await this.createSubscription(
        priceId,
        newCustomer.id,
      );

      if (subscription) {
        await this.prismaService.tenant.update({
          where: { id: tenantId },
          data: {
            subscriptionType: subcriptionType,
          },
        });
        return subscription;
      }
    }
    const subscription = await this.listSubscriptions(priceId, isCustomer.id);
    if (subscription.data.length) {
      throw new BadRequestException('You have already subcribed');
    }

    return await this.createSubscription(priceId, isCustomer.id);
  }

  async createCustomer(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    const newCustomer = await this.stripe.customers.create({
      email: user.email,
      description: 'Valueable customer of PM App',
    });
    return newCustomer;
  }

  async attachCreditCard(attachCardDto: AttachCardDto) {
    const { paymentMethodId, customerId } = attachCardDto;
    return await this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
  }

  async setDefaultCreditCard(paymentMethodId: string, customerId: string) {
    try {
      return await this.stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    } catch (error) {
      if (error?.type === 'StripeInvalidRequestError') {
        throw new BadRequestException('Wrong credit card chosen');
      }
      throw new InternalServerErrorException();
    }
  }

  async createSubscription(priceId: string, customerId: string) {
    try {
      return await this.stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId,
          },
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed Subscription');
    }
  }
  async listSubscriptions(priceId: string, customerId: string) {
    return this.stripe.subscriptions.list({
      customer: customerId,
      price: priceId,
    });
  }
}
