import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCurrentViewDto {
  @IsNotEmpty()
  @IsString()
  currentView: string;
}
