import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @IsArray()
  public users: string[];
}
