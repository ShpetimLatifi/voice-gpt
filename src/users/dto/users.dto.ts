import { IsNotEmpty } from 'class-validator';

export class UsersDto {
  @IsNotEmpty()
  deviceId: string;
}
