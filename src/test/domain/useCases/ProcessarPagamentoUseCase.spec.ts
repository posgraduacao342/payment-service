import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Pagamento } from 'src/domain/entities/Pagamento';
import { StatusPagamento } from 'src/domain/enums';
import { MetodoPagamentoFactory } from 'src/domain/factories/MetodoPagamentoFactory';
import {
  PagamentoGatewayPort,
  PagamentoGatewayPortKey,
} from 'src/domain/ports/out/PagamentoGatewayPort';
import { ProcessarPagamentoUseCase } from 'src/domain/useCases/ProcessarPagamentoUseCase';
import { PedidoHelper } from 'src/test/helpers/PedidoHelper';

describe('ProcessarPagamentoUseCase', () => {
  let useCase: ProcessarPagamentoUseCase;
  let pagamentoGatewayPort: PagamentoGatewayPort;
  let metodoPagamentoFactory: MetodoPagamentoFactory;

  const pedido = PedidoHelper.gerarPedido();
  const pagamento = Pagamento.criarNovoPagamento(
    pedido,
    StatusPagamento.EM_PROGRESSO,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessarPagamentoUseCase,
        {
          provide: PagamentoGatewayPortKey,
          useValue: {
            atualizarPagamento: jest.fn(),
            obterPagamentoPorIdDoPedido: jest.fn(),
            criarPagamento: jest.fn(),
          },
        },
        {
          provide: MetodoPagamentoFactory,
          useValue: {
            obterEstrategia: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<ProcessarPagamentoUseCase>(ProcessarPagamentoUseCase);
    pagamentoGatewayPort = module.get<PagamentoGatewayPort>(
      PagamentoGatewayPortKey,
    );
    metodoPagamentoFactory = module.get<MetodoPagamentoFactory>(
      MetodoPagamentoFactory,
    );
  });

  it('deve ser criado corretamente', () => {
    //Assert
    expect(useCase).toBeDefined();
  });

  it('deve chamar o metodo de obter pagamento por pedido id passando o parametro correto', async () => {
    //Arrange
    const mockEstrategia = {
      processarPagamento: jest.fn(),
    };

    jest
      .spyOn(metodoPagamentoFactory, 'obterEstrategia')
      .mockReturnValueOnce(mockEstrategia);

    //Act
    await useCase.execute(pedido);

    // Assert
    expect(pagamentoGatewayPort.obterPagamentoPorIdDoPedido).toBeCalledWith(
      pedido.id,
    );
  });

  it('deve retornar uma exeção de conflito pois o pagamento já foi feito', async () => {
    //Arrange
    jest
      .spyOn(pagamentoGatewayPort, 'obterPagamentoPorIdDoPedido')
      .mockResolvedValue(pagamento);

    // Act and Assert
    await expect(useCase.execute(pedido)).rejects.toThrowError(
      ConflictException,
    );
  });

  it('deve chamar o metodo de criar pagamento', async () => {
    //Arrange
    const mockEstrategia = {
      processarPagamento: jest.fn(),
    };

    jest
      .spyOn(metodoPagamentoFactory, 'obterEstrategia')
      .mockReturnValueOnce(mockEstrategia);

    jest.spyOn(Pagamento, 'criarNovoPagamento').mockReturnValueOnce(pagamento);

    //Act
    await useCase.execute(pedido);

    // Assert
    expect(pagamentoGatewayPort.criarPagamento).toBeCalledWith(pagamento);
  });

  it('deve chamar o metodo de processar o pagamento', async () => {
    //Arrange
    const mockEstrategia = {
      processarPagamento: jest.fn(),
    };

    jest
      .spyOn(metodoPagamentoFactory, 'obterEstrategia')
      .mockReturnValueOnce(mockEstrategia);

    jest.spyOn(Pagamento, 'criarNovoPagamento').mockReturnValueOnce(pagamento);

    //Act
    await useCase.execute(pedido);

    // Assert
    expect(mockEstrategia.processarPagamento).toHaveBeenCalled();
  });
});
