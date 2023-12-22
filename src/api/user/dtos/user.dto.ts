import { IsEnum, IsUUID } from 'class-validator';
import { AvailableForRegisterUserRoles } from '../../../utils/constants';

export class UserIdDto {
  @IsUUID()
  id: string;
}

export class UserRoleDto {
  @IsEnum(AvailableForRegisterUserRoles)
  role: string;
}
