import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class EstornarPedidoDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  pedidoId: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  clienteId?: string;
}
