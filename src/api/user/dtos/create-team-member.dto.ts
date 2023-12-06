import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { IsIdentifierAvailable } from '../../../utils/decorators/validation.helpers';

export class CreateTeamMemberReqDto {
  @IsEmail()
  @IsIdentifierAvailable('email')
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[0-9])/, {
    message: 'password should contain at least one letter and one number',
  })
  password: string;
}
