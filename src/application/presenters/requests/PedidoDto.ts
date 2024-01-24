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
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsNotEmpty()
  preco: number;
}

export class ItemDto extends Item {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  observacoes: string;

  @ValidateNested()
  @Type(() => ProdutoDto)
  @IsNotEmpty()
  produto: ProdutoDto;

  @IsNumber()
  @IsNotEmpty()
  quantidade: number;
}

export class PedidoDto extends Pedido {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  preco: number;

  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  @IsNotEmpty()
  itens: ItemDto[];

  @IsEnum(MetodoPagamento)
  @IsNotEmpty()
  metodoPagamento: MetodoPagamento;
}
