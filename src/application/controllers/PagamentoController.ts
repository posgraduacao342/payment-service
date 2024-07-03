import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { Pagamento } from 'src/domain/entities/Pagamento';
import { ObterPagamentosUseCase } from 'src/domain/useCases/ObterPagamentosUseCase';
import { ProcessarPagamentoUseCase } from 'src/domain/useCases/ProcessarPagamentoUseCase';
import { PedidoDto } from '../presenters/requests/PedidoDto';
import { ApiTags } from '@nestjs/swagger';
import { ProcessarPagamentoMPDto } from '../presenters/requests/ProcessarPagamentoMPDto';
import { ValidarPagamentoMPUseCase } from 'src/domain/useCases/ValidarPagamentoMPUseCase';
import { ObterPagamentoPorPedidoIdUseCase } from 'src/domain/useCases/ObterPagamentoPorPedidoIdUseCase';
import { EstornarPedidoDto } from '../presenters/requests/EstornarPedidoDto';
import { ProcessarEstornoUseCase } from 'src/domain/useCases/ProcessarEstornoUseCase';

@ApiTags('Pagamentos')
@Controller('pagamentos')
export class PagamentoController {
  constructor(
    private readonly processarPagamentoUseCase: ProcessarPagamentoUseCase,
    private readonly processarEstornoUseCase: ProcessarEstornoUseCase,
    private readonly obterPagamentosUseCase: ObterPagamentosUseCase,
    private readonly validarPagamentoMPUseCase: ValidarPagamentoMPUseCase,
    private readonly obterPagamentoPorPedidoIdUseCase: ObterPagamentoPorPedidoIdUseCase,
  ) {}

  @Post()
  async processarPagamento(@Body() pedidoDto: PedidoDto): Promise<Pagamento> {
    return await this.processarPagamentoUseCase.execute(pedidoDto);
  }

  @Post('estorno')
  async processarEstorno(@Body() estorno: EstornarPedidoDto): Promise<string> {
    await this.processarEstornoUseCase.execute(
      estorno.pedidoId,
      estorno.clienteId,
    );
    return 'ok';
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

  @Get('/:pedidoId')
  async buscarPagamentoPorId(
    @Param('pedidoId', ParseUUIDPipe) pedidoId: string,
  ): Promise<Pagamento> {
    return await this.obterPagamentoPorPedidoIdUseCase.execute(pedidoId);
  }
}
