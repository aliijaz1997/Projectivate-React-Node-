import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
export class CreateInviteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
