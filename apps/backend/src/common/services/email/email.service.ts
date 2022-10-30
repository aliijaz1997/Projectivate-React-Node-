import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EnvironmentVariables } from 'src/config/environment-variables';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {
    const transporter = createTransport({
      host: this.configService.get<string>('HOST'),
      port: this.configService.get('SMPTP_PORT'),
      secure: this.configService.get('SECURE'),
      auth: {
        user: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        pass: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.transporter = transporter;
  }
  private transporter: Transporter<SMTPTransport.SentMessageInfo> = null;
  public async sendEmail({
    subject,
    to,
    html,
    text,
  }: Omit<MailOptions, 'from'>) {
    const mailOptions = {
      from: this.configService.get('OFFICIAL_EMAIL'),
      headers: {
        'X-SES-MESSAGE-TAGS': 'key0=value0',
      },
      subject,
      to,
      html,
      text,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
