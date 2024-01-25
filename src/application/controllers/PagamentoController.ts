import { Body, Controller, Get, Post } from '@nestjs/common';
import { Pagamento } from 'src/domain/entities/Pagamento';
import { ObterPagamentosUseCase } from 'src/domain/useCases/ObterPagamentosUseCase';
import { ProcessarPagamentoUseCase } from 'src/domain/useCases/ProcessarPagamentoUseCase';
import { PedidoDto } from '../presenters/requests/PedidoDto';
import { ApiTags } from '@nestjs/swagger';
import { ProcessarPagamentoMPDto } from '../presenters/requests/ProcessarPagamentoMPDto';
import { ValidarPagamentoMPUseCase } from 'src/domain/useCases/ValidarPagamentoMPUseCase';

@ApiTags('Pagamentos')
@Controller('pagamentos')
export class PagamentoController {
  constructor(
    private readonly processarPagamentoUseCase: ProcessarPagamentoUseCase,
    private readonly obterPagamentosUseCase: ObterPagamentosUseCase,
    private readonly validarPagamentoMPUseCase: ValidarPagamentoMPUseCase,
  ) {}

  @Post()
  async processarPagamento(@Body() pedidoDto: PedidoDto): Promise<Pagamento> {
    return await this.processarPagamentoUseCase.execute(pedidoDto);
  }

  @Post('/mercado-pago/webhooks')
  public async mercadoPagoWe(
    @Body() pedidoDto: ProcessarPagamentoMPDto,
  ): Promise<string> {
    await this.validarPagamentoMPUseCase.execute(pedidoDto.data.id);

    return 'ok';
  }

  @Get()
  async buscarPagamentos(): Promise<Pagamento[]> {
    return await this.obterPagamentosUseCase.execute();
  }
}
