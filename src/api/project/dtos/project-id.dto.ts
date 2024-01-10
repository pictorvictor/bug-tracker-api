import { IsString } from 'class-validator';

export class ProjectIdDto {
  @IsString()
  projectId: string;
}
