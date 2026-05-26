import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe, { Stripe as StripeInstance } from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  private readonly stripe: StripeInstance;

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {
    this.stripe = new Stripe(
      this.configService.getOrThrow('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2026-04-22.dahlia',
      },
    );
  }

  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      payment_method_types: ['card'],
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
    });

    this.notificationsService.emit('notify_email', {
      email,
      text: `Your payment of $${amount} has completed successfully.`,
    });

    return paymentIntent;
  }
}
