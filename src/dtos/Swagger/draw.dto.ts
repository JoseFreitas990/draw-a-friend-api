import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDrawDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public groupId: string;

  @IsString()
  @IsNotEmpty()
  public resultId: string;
}
