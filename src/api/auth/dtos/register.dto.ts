import { UserRole } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';
import { IsIdentifierAvailable } from '../../../utils/decorators/validation.helpers';
import { AvailableForRegisterUserRoles } from '../../../utils/constants';

export class RegisterReqDto {
  @IsString()
  @IsIdentifierAvailable('email')
  identifier: string;

  @IsString()
  password: string;

  @IsEnum(AvailableForRegisterUserRoles)
  role: UserRole;
}
