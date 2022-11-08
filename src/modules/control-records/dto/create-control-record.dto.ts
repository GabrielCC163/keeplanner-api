import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateControlRecordDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? Number(value) : 2022))
  @IsNumber()
  @Min(2022)
  year: number;
}
