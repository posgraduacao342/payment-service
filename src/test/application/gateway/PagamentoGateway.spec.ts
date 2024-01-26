import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoGateway } from 'src/application/gateway/PagamentoGateway';
import { PagamentoMapper } from 'src/application/gateway/mappers/PagamentoMapper';
import { Pagamento } from 'src/domain/entities/Pagamento';
import { StatusPagamento } from 'src/domain/enums';
import {
  PagamentoRepositoryPort,
  PagamentoRepositoryPortKey,
} from 'src/infrastructure/db/repositories/PagamentoRepositoryPort';
import { PedidoHelper } from 'src/test/helpers/PedidoHelper';

describe('PagamentoGateway', () => {
  let gateway: PagamentoGateway;
  let pagamentoRepositoryPort: PagamentoRepositoryPort;

  const pedido = PedidoHelper.gerarPedido();
  const pagamento = Pagamento.criarNovoPagamento(
    pedido,
    StatusPagamento.EM_PROGRESSO,
  );

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
    // Arrange
    const pagamentoId = 'pagamentoId';

    //Act
    await gateway.deletarPagamentoPorId(pagamentoId);

    //Assert
    expect(pagamentoRepositoryPort.deletarPagamentoPorId).toHaveBeenCalledWith(
      pagamentoId,
    );
  });

  it('deve chamar o metodo obterPagamentos', async () => {
    // Arrange
    jest
      .spyOn(pagamentoRepositoryPort, 'obterPagamentos')
      .mockResolvedValueOnce([PagamentoMapper.toEntity(pagamento)]);

    //Act
    await gateway.obterPagamentos();

    //Assert
    expect(pagamentoRepositoryPort.obterPagamentos).toBeCalled();
  });

  it('deve chamar o metodo criarPagamento', async () => {
    // Arrange
    const pagamentoEntity = PagamentoMapper.toEntity(pagamento);
    jest
      .spyOn(pagamentoRepositoryPort, 'criarPagamento')
      .mockResolvedValueOnce(pagamentoEntity);

    //Act
    await gateway.criarPagamento(pagamento);

    //Assert
    expect(pagamentoRepositoryPort.criarPagamento).toBeCalledWith(
      PagamentoMapper.toEntity(pagamento),
    );
  });

  it('deve chamar o metodo atualizarPagamento', async () => {
    // Arrange
    const pagamentoEntity = PagamentoMapper.toEntity(pagamento);
    jest
      .spyOn(pagamentoRepositoryPort, 'atualizarPagamento')
      .mockResolvedValueOnce(pagamentoEntity);

    //Act
    await gateway.atualizarPagamento(pagamento);

    //Assert
    expect(pagamentoRepositoryPort.atualizarPagamento).toBeCalledWith(
      PagamentoMapper.toEntity(pagamento),
    );
  });

  it('deve chamar o metodo obterPagamentoPorIdDoPedido', async () => {
    // Arrange
    const pagamentoId = 'pagamentoId';

    //Act
    await gateway.obterPagamentoPorIdDoPedido(pagamentoId);

    //Assert
    expect(pagamentoRepositoryPort.obterPagamentoPorIdDoPedido).toBeCalledWith(
      pagamentoId,
    );
  });
});
