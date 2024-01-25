import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoController } from 'src/application/controllers/PagamentoController';
import { ProcessarPagamentoMPDto } from 'src/application/presenters/requests/ProcessarPagamentoMPDto';
import { Pagamento } from 'src/domain/entities/Pagamento';
import { StatusPagamento } from 'src/domain/enums';
import { ObterPagamentoPorPedidoIdUseCase } from 'src/domain/useCases/ObterPagamentoPorPedidoIdUseCase';
import { ObterPagamentosUseCase } from 'src/domain/useCases/ObterPagamentosUseCase';
import { ProcessarPagamentoUseCase } from 'src/domain/useCases/ProcessarPagamentoUseCase';
import { ValidarPagamentoMPUseCase } from 'src/domain/useCases/ValidarPagamentoMPUseCase';
import { PedidoHelper } from 'src/test/helpers/PedidoHelper';

describe('MercadoPagoGateway', () => {
  let controller: PagamentoController;
  let processarPagamentoUseCase: ProcessarPagamentoUseCase;
  let obterPagamentosUseCase: ObterPagamentosUseCase;
  let validarPagamentoMPUseCase: ValidarPagamentoMPUseCase;
  let obterPagamentoPorPedidoIdUseCase: ObterPagamentoPorPedidoIdUseCase;

  const pedido = PedidoHelper.gerarPedido();
  const pagamento = Pagamento.criarNovoPagamento(pedido, StatusPagamento.PAGO);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagamentoController,
        {
          provide: ProcessarPagamentoUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ObterPagamentosUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ValidarPagamentoMPUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ObterPagamentoPorPedidoIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PagamentoController>(PagamentoController);
    processarPagamentoUseCase = module.get<ProcessarPagamentoUseCase>(
      ProcessarPagamentoUseCase,
    );
    obterPagamentosUseCase = module.get<ObterPagamentosUseCase>(
      ObterPagamentosUseCase,
    );
    validarPagamentoMPUseCase = module.get<ValidarPagamentoMPUseCase>(
      ValidarPagamentoMPUseCase,
    );
    obterPagamentoPorPedidoIdUseCase =
      module.get<ObterPagamentoPorPedidoIdUseCase>(
        ObterPagamentoPorPedidoIdUseCase,
      );
  });

  it('deve ser definido', () => {
    // Assert
    expect(controller).toBeDefined();
  });

  it('deve chamar o método processarPagamento corretamente', async () => {
    //Arrange
    jest
      .spyOn(processarPagamentoUseCase, 'execute')
      .mockResolvedValueOnce(pagamento);

    // Act
    const result = await controller.processarPagamento(pedido);

    // Assert
    expect(processarPagamentoUseCase.execute).toHaveBeenCalledWith(pedido);
    expect(result).toEqual(pagamento);
  });

  it('deve chamar o método mercadoPagoWe corretamente', async () => {
    // Arrange
    const pedidoDto: ProcessarPagamentoMPDto = {
      data: {
        id: 'id',
      },
    };

    // Act
    const result = await controller.mercadoPagoWe(pedidoDto);

    // Assert
    expect(validarPagamentoMPUseCase.execute).toHaveBeenCalledWith(
      pedidoDto.data.id,
    );
    expect(result).toBe('ok');
  });

  it('deve chamar o método buscarPagamentos corretamente', async () => {
    //Arrange
    jest
      .spyOn(obterPagamentosUseCase, 'execute')
      .mockResolvedValueOnce([pagamento]);

    // Act
    const result = await controller.buscarPagamentos();

    // Assert
    expect(obterPagamentosUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual([pagamento]);
  });

  it('deve chamar o método buscarPagamentoPorId corretamente', async () => {
    // Arrange
    const pedidoId = 'pedidoId';
    jest
      .spyOn(obterPagamentoPorPedidoIdUseCase, 'execute')
      .mockResolvedValueOnce(pagamento);

    // Act
    const result = await controller.buscarPagamentoPorId(pedidoId);

    // Assert
    expect(obterPagamentoPorPedidoIdUseCase.execute).toHaveBeenCalledWith(
      pedidoId,
    );
    expect(result).toEqual(pagamento);
  });
});
