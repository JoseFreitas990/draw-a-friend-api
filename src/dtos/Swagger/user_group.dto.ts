import { ArrayMinSize, IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateUserGroup {
  @IsString()
  @IsNotEmpty()
  public userID: string;

  @IsNotEmpty()
  @IsString()
  public groupID: string;
}
