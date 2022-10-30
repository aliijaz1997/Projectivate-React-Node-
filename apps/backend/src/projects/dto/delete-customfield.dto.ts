import { IsBoolean, IsNotEmpty } from 'class-validator';

export class DeleteCustomFieldDto {
  @IsNotEmpty()
  @IsBoolean()
  keepTasks: boolean;
}
