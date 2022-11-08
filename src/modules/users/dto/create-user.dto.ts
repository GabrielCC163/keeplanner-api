import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) =>
    value.toLowerCase().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, ''),
  )
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(7, {
    message: 'password must be longer than or equal to 7 characters',
  })
  @IsString()
  password: string;
}
