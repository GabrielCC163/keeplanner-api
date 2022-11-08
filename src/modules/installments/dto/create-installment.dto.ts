import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateInstallmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsDefined()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @Min(1)
  installment: number;

  @ApiProperty()
  @IsDefined()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @Min(2)
  totalInstallments: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  installmentCategoryId: string;
}
