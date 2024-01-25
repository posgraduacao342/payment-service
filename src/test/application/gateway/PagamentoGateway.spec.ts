import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoGateway } from 'src/application/gateway/PagamentoGateway';
import { StatusPagamento } from 'src/domain/enums';
import {
  PagamentoRepositoryPort,
  PagamentoRepositoryPortKey,
} from 'src/infrastructure/db/repositories/PagamentoRepositoryPort';

describe('PagamentoGateway', () => {
  let gateway: PagamentoGateway;
  let pagamentoRepositoryPort: PagamentoRepositoryPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagamentoGateway,
        {
          provide: PagamentoRepositoryPortKey,
          useValue: {
            atualizarStatusPorPedidoId: jest.fn(),
            deletarPagamentoPorId: jest.fn(),
            obterPagamentos: jest.fn(),
            criarPagamento: jest.fn(),
            atualizarPagamento: jest.fn(),
            obterPagamentoPorIdDoPedido: jest.fn(),
          },
        },
      ],
    }).compile();

    gateway = module.get<PagamentoGateway>(PagamentoGateway);
    pagamentoRepositoryPort = module.get<PagamentoRepositoryPort>(
      PagamentoRepositoryPortKey,
    );
  });

  it('deve ser definido', () => {
    expect(gateway).toBeDefined();
  });

  it('deve chamar atualizarStatusPorPedidoId corretamente', async () => {
    const pedidoId = 'pedidoId';
    const statusPagamento = StatusPagamento.PAGO;

    await gateway.atualizarStatusPorPedidoId(pedidoId, statusPagamento);

    expect(
      pagamentoRepositoryPort.atualizarStatusPorPedidoId,
    ).toHaveBeenCalledWith(pedidoId, statusPagamento);
  });

  it('deve chamar deletarPagamentoPorId corretamente', async () => {
    const pagamentoId = 'pagamentoId';

    await gateway.deletarPagamentoPorId(pagamentoId);

    expect(pagamentoRepositoryPort.deletarPagamentoPorId).toHaveBeenCalledWith(
      pagamentoId,
    );
  });
});
