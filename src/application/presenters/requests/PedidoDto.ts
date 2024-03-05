import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Item } from 'src/domain/entities/Item';
import { Pedido } from 'src/domain/entities/Pedido';
import { Produto } from 'src/domain/entities/Produto';
import { MetodoPagamento } from 'src/domain/enums';

export class ProdutoDto extends Produto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  preco: number;
}

export class ItemDto extends Item {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  observacoes?: string;

  @ApiProperty({ type: ProdutoDto })
  @ValidateNested()
  @Type(() => ProdutoDto)
  @IsNotEmpty()
  produto: ProdutoDto;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantidade: number;
}

export class PedidoDto extends Pedido {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  clienteId?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  preco: number;

  @ApiProperty({ type: ItemDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  @IsNotEmpty()
  itens: ItemDto[];

  @ApiProperty({ enum: MetodoPagamento })
  @IsEnum(MetodoPagamento)
  @IsNotEmpty()
  metodoPagamento: MetodoPagamento;
}
