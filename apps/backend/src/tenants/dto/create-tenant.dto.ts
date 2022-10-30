import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class TenantResopnse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}
