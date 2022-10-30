import { Controller, Post, Body } from '@nestjs/common';
import { InviteService } from './invite.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { GetUserId } from '../auth/get-user-decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetTenantId } from '../common/decorators/gettenantid.decorator';

@ApiBearerAuth()
@ApiTags('Invite')
@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post()
  async create(
    @Body() createInviteDto: CreateInviteDto,
    @GetUserId() inviteSenderId: string,
    @GetTenantId() tenantId: string,
  ) {
    await this.inviteService.createInvitation(
      createInviteDto,
      tenantId,
      inviteSenderId,
    );

    return {
      statusCode: 201,
      message: 'Success',
    };
  }
}
