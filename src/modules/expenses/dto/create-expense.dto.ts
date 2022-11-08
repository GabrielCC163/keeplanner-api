import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { ExpenseStatus } from '../enums/expense-status.enum';

export class CreateExpenseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  totalValue: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : null))
  @IsNumber()
  @Min(1)
  @Max(31)
  dueDay?: number;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  @Max(12)
  dueMonth: number;

  @ApiPropertyOptional({ enum: ExpenseStatus, example: ExpenseStatus.AP, default: ExpenseStatus.AP })
  @IsOptional()
  @IsEnum(ExpenseStatus)
  status?: ExpenseStatus = ExpenseStatus.AP;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  controlRecordId: string;
}
