import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';

class Schema {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => Schema)
  public users: Schema[];
}
