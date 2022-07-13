import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateIncomeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountName: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  totalValue: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  @Max(31)
  dayOfReceipt?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  fixed?: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  controlRecordId: string;
}
