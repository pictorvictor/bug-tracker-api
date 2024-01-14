import { BugStatus, PriorityEnum, ResolutionEnum } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateBugDto{
  @IsOptional()
  @IsEnum(BugStatus)
  status?: BugStatus;

  @IsOptional()
  @IsEnum(PriorityEnum)
  priority?: PriorityEnum;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  details?: string;

  @IsOptional()
  @IsString()
  testSteps?: string;

  @IsOptional()
  @IsString()
  solution?: string;

  @IsOptional()
  @IsEnum(ResolutionEnum)
  resolution?: ResolutionEnum;

  @IsOptional()
  @IsString()
  issueLink?: string;

  @IsOptional()
  @IsString()
  assignedToId?: string;
}