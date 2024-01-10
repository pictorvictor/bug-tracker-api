import { IsString } from 'class-validator';

export class BugIdDto {
  @IsString()
  bugId: string;
}
