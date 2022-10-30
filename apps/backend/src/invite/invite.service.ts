import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { EnvironmentVariables } from '../config/environment-variables';
import { CreateInviteDto } from './dto/create-invite.dto';
import { EmailService } from '../common/services/email/email.service';

@Injectable()
export class InviteService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private configService: ConfigService<EnvironmentVariables>,
  ) {}
  public baseUrl: string = this.configService.get<string>('BASE_URL');
  public officialEmail: string =
    this.configService.get<string>('OFFICIAL_EMAIL');

  async createInvitation(
    createInviteDto: CreateInviteDto,
    tenantId: string,
    inviteSenderId: string,
  ) {
    const subject = 'Welcome to PM App';
    const body_text = `This email was sent in order to confirm the invitation.`;
    const { email } = createInviteDto;
    const inviteExists = await this.prisma.invite.findUnique({
      where: { email },
    });
    if (inviteExists) {
      throw new NotAcceptableException(
        'You cannot send invite more than one time',
      );
    }
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!userExists) {
      await this.prisma.invite.create({
        data: {
          email,
          tenantId,
          inviteAccepted: false,
          inviteSenderId,
        },
      });
      const inviteLinkWithRegisteration = `${this.baseUrl}/auth/register?tenantId=${tenantId}`;
      const body_html = `<html>
      <head>Hi, Click the link below for confirmation</head>
      <body>
        <h1>Project Managment App</h1>
        <p>Click link below
           <a href='${inviteLinkWithRegisteration}'>Vew Your Organization</a>
           </p>
      </body>
      </html>`;
      await this.emailService.sendEmail({
        subject: subject,
        to: createInviteDto.email,
        text: body_text,
        html: body_html,
      });
      return inviteLinkWithRegisteration;
    }
    await this.prisma.tenantsToUsers.create({
      data: { tenantId, userId: userExists.id },
    });
    const invitationLink = this.baseUrl;
    const body_html = `<html>
    <head>Hi, Click the link below for confirmation</head>
    <body>
      <h1>Project Managment App</h1>
      <p>Click link below
         <a href='${invitationLink}'>Vew Your Organization</a>
         </p>
    </body>
    </html>`;
    await this.emailService.sendEmail({
      subject: subject,
      to: createInviteDto.email,
      text: body_text,
      html: body_html,
    });
    return invitationLink;
  }
}
