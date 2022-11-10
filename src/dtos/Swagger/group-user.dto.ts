import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupUser {
  @IsString()
  @IsNotEmpty()
  public userID: string;

  @IsNotEmpty()
  @IsString()
  public groupID: string;
}
