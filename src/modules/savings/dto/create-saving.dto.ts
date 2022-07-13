import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateSavingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountName: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  totalValue: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  controlRecordId: string;
}
