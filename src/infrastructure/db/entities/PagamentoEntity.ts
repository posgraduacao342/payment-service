import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MetodoPagamento, StatusPagamento } from 'src/domain/enums';

export type PagamentoEntityDocument = HydratedDocument<PagamentoEntity>;

@Schema({ collection: 'pagamentos' })
export class PagamentoEntity {
  @Prop()
  _id: string;

  @Prop({ required: true, unique: true })
  pedidoId: string;

  @Prop({ required: true, type: String, enum: StatusPagamento })
  statusPagamento: StatusPagamento;

  @Prop({ required: true })
  valorPagamento: number;

  @Prop({ required: true, type: String, enum: MetodoPagamento })
  metodoPagamento: MetodoPagamento;

  @Prop({ type: Date, required: true })
  dataCriacao: Date;

  @Prop({ type: Date, required: true })
  dataAtualizacao: Date;

  @Prop({ type: Date, required: false })
  dataDelecao?: Date;

  @Prop({ required: false })
  qrCode?: string;
}

export const PagamentoSchema = SchemaFactory.createForClass(PagamentoEntity);
