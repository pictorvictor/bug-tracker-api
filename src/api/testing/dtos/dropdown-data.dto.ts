import { Transform } from 'class-transformer';
import { IsOptional, IsString, Validate } from 'class-validator';
import { OnlyOneOf } from '../../../utils/decorators/validation-helpers';

export class DropdownDataConditionsDto {
  @Validate(OnlyOneOf, ['category', 'sizeGroupId'])
  @Transform(({ value }) => value.toLowerCase().trim().replace(/\s+/g, ''))
  @IsOptional()
  @IsString()
  category?: string;

  @Validate(OnlyOneOf, ['category', 'sizeGroupId'])
  @Transform(({ value }) => value.toLowerCase().trim().replace(/\s+/g, ''))
  @IsOptional()
  @IsString()
  sizeGroupId?: string;
}
