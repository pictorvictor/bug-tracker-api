import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateProjectReqDto {
  @IsString()
  repositoryName: string;

  @IsString()
  projectName: string;

  @IsOptional()
  @IsArray()
  projectMembers?: string[];

  @IsOptional()
  @IsArray()
  testers?: string[];
}
