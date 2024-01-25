import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class Data {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class ProcessarPagamentoMPDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Data)
  data: Data;
}
