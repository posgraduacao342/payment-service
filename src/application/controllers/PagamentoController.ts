import { Body, Controller, Get, Post } from '@nestjs/common';
import { Pagamento } from 'src/domain/entities/Pagamento';
import { Pedido } from 'src/domain/entities/Pedido';
import { ObterPagamentosUseCase } from 'src/domain/useCases/ObterPagamentosUseCase';
import { ProcessarPagamentoUseCase } from 'src/domain/useCases/ProcessarPagamentoUseCase';

@Controller('pagamentos')
export class PagamentoController {
  constructor(
    private readonly processarPagamentoUseCase: ProcessarPagamentoUseCase,
    private readonly obterPagamentosUseCase: ObterPagamentosUseCase,
  ) {}

  @Post()
  async processarPagamento(@Body() pedido: Pedido): Promise<Pagamento> {
    return await this.processarPagamentoUseCase.execute(pedido);
  }

  @Get()
  async buscarPagamentos(): Promise<Pagamento[]> {
    return await this.obterPagamentosUseCase.execute();
  }
}
