import {
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register-dto';
import { Response } from 'express';
import { Public } from '../common/auth/public.guard';
import { PublicTenant } from '../common/guards/publictenant.guard';

@Public()
@PublicTenant()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ description: 'You have been registered', status: 200 })
  async register(
    @Body() registerRequest: registerDto,
    @Query('tenantId') tenantId: string,
  ) {
    try {
      this.logger.verbose('Register user in process');
      await this.authService.registerUser(registerRequest, tenantId);
      return {
        statusCode: 201,
        message: 'Success',
      };
    } catch (error) {
      this.logger.error(`Failed to register`, error);
      throw new InternalServerErrorException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('tenantId');
    return null;
  }
}
