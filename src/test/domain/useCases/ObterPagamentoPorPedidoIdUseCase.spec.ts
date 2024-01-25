import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Pagamento } from 'src/domain/entities/Pagamento';
import { StatusPagamento } from 'src/domain/enums';
import {
  PagamentoGatewayPort,
  PagamentoGatewayPortKey,
} from 'src/domain/ports/out/PagamentoGatewayPort';
import { ObterPagamentoPorPedidoIdUseCase } from 'src/domain/useCases/ObterPagamentoPorPedidoIdUseCase';
import { PedidoHelper } from 'src/test/helpers/PedidoHelper';

describe('ObterPagamentoPorPedidoIdUseCase', () => {
  let useCase: ObterPagamentoPorPedidoIdUseCase;
  let pagamentoGatewayPort: PagamentoGatewayPort;

  const pedido = PedidoHelper.gerarPedido();
  const pagamento = Pagamento.criarNovoPagamento(
    pedido,
    StatusPagamento.EM_PROGRESSO,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObterPagamentoPorPedidoIdUseCase,
        {
          provide: PagamentoGatewayPortKey,
          useValue: {
            obterPagamentoPorIdDoPedido: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<ObterPagamentoPorPedidoIdUseCase>(
      ObterPagamentoPorPedidoIdUseCase,
    );
    pagamentoGatewayPort = module.get<PagamentoGatewayPort>(
      PagamentoGatewayPortKey,
    );
  });

  it('deve ser criado corretamente', () => {
    //Assert
    expect(useCase).toBeDefined();
  });

  it('deve chamar o metodo de obter pagamento por pedido id passando o parametro correto', async () => {
    //Arrange
    jest
      .spyOn(pagamentoGatewayPort, 'obterPagamentoPorIdDoPedido')
      .mockResolvedValueOnce(pagamento);

    //Act
    await useCase.execute(pedido.id);

    // Assert
    expect(pagamentoGatewayPort.obterPagamentoPorIdDoPedido).toBeCalledWith(
      pedido.id,
    );
  });

  it('deve lançar uma exceção se não encontrar o pagamento', async () => {
    // Act and Assert
    await expect(async () => {
      await useCase.execute(pedido.id);
    }).rejects.toThrowError(NotFoundException);
  });
});
