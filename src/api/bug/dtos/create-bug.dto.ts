import { PriorityEnum } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateBugReqDto {
  @IsString()
  title: string;

  @IsEnum(PriorityEnum)
  priority: PriorityEnum;

  @IsString()
  details: string;

  @IsString()
  issueLink: string;

  @IsString()
  @IsOptional()
  assignedTo?: string;
}
