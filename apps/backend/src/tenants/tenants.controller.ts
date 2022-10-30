import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto, TenantResopnse } from './dto/create-tenant.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserId } from '../auth/get-user-decorator';
import { Response } from 'express';
import { PublicTenant } from '../common/guards/publictenant.guard';
import { TenantsToUsers } from '.prisma/client';
import { Tenant } from '@prisma/client';
import { GetTenantId } from '../common/decorators/gettenantid.decorator';

@ApiBearerAuth()
@ApiTags('Tenants')
@PublicTenant()
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @ApiResponse({ description: 'Created tenant', type: TenantResopnse })
  async create(
    @Body() createTenantDto: CreateTenantDto,
    @GetUserId() userId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TenantResopnse> {
    const newTenant = await this.tenantsService.create(createTenantDto, userId);
    res.cookie('tenantId', newTenant.id);
    return newTenant;
  }
  @Get(':assigneeId/user')
  async findAssigneeInTask(@Param('assigneeId') assigneeId: string) {
    return await this.tenantsService.findAssigneeInTask(assigneeId);
  }
  @Get(':id/users')
  @ApiResponse({ description: 'Get All members of a tenant', status: 200 })
  async findAllMembers(
    @Param('id') id: string,
    @GetTenantId() tenantId: string,
  ) {
    return await this.tenantsService.findMembersByTenantId(tenantId);
  }

  @Post(':id/users')
  @ApiResponse({ description: 'User added to tenant', status: 200 })
  addUserToTenant(@Param('id') id: string, @GetUserId() userId: string) {
    return this.tenantsService.addUserToTenant(id, userId);
  }

  @Get()
  @ApiResponse({ description: 'Fetched tenants', type: [TenantResopnse] })
  findAllTenatsByUserId(@GetUserId() userId: string): Promise<Tenant[]> {
    return this.tenantsService.findAllTenantsByUserId(userId);
  }

  @Get(':id')
  @ApiResponse({
    description: 'Fetched tenant with the provided id',
    type: TenantResopnse,
  })
  async findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TenantResopnse> {
    res.cookie('tenantId', id);
    return await this.tenantsService.findOne({ id: id });
  }

  @Delete(':id')
  @ApiResponse({ description: 'Deleted tenant', type: TenantResopnse })
  remove(@Param('id') id: string): Promise<TenantResopnse> {
    return this.tenantsService.remove({ id: id });
  }

  @Delete(':id/users')
  @ApiResponse({ description: 'Removed user from tenant', status: 200 })
  removeUserFromTenant(
    @Param('id') id: string,
    @GetUserId() userId: string,
  ): Promise<TenantsToUsers> {
    return this.tenantsService.removeUserFromTenant(id, userId);
  }
}
