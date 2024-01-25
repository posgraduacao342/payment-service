import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagamentoEntity, PagamentoSchema } from './entities/PagamentoEntity';
import { PagamentoRepositoryPortKey } from './repositories/PagamentoRepositoryPort';
import { PagamentoRepository } from './repositories/PagamentoRepository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PagamentoEntity.name,
        schema: PagamentoSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: PagamentoRepositoryPortKey,
      useClass: PagamentoRepository,
    },
  ],
  exports: [
    {
      provide: PagamentoRepositoryPortKey,
      useClass: PagamentoRepository,
    },
    MongooseModule.forFeature([
      {
        name: PagamentoEntity.name,
        schema: PagamentoSchema,
      },
    ]),
  ],
})
export class MongoModule {}
