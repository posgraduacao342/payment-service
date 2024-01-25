import { Test, TestingModule } from '@nestjs/testing';
import { Pagamento } from 'src/domain/entities/Pagamento';
import { StatusPagamento } from 'src/domain/enums';
import {
  MercadoPagoGatewayPort,
  MercadoPagoGatewayPortKey,
} from 'src/domain/ports/out/MercadoPagoGatewayPort';
import {
  PagamentoGatewayPort,
  PagamentoGatewayPortKey,
} from 'src/domain/ports/out/PagamentoGatewayPort';
import { ValidarPagamentoMPUseCase } from 'src/domain/useCases/ValidarPagamentoMPUseCase';
import { PedidoHelper } from 'src/test/helpers/PedidoHelper';

describe('ValidarPagamentoMPUseCase', () => {
  let useCase: ValidarPagamentoMPUseCase;
  let pagamentoGatewayPort: PagamentoGatewayPort;
  let mercadoPagoGatewayPort: MercadoPagoGatewayPort;

  const pagamentoId = 'pagamentoId';
  const pedido = PedidoHelper.gerarPedido();
  const pagamento = Pagamento.criarNovoPagamento(
    pedido,
    StatusPagamento.EM_PROGRESSO,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidarPagamentoMPUseCase,
        {
          provide: PagamentoGatewayPortKey,
          useValue: {
            atualizarStatusPorPedidoId: jest.fn(),
          },
        },
        {
          provide: MercadoPagoGatewayPortKey,
          useValue: {
            pagamentoFoiRealizadoComSucesso: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<ValidarPagamentoMPUseCase>(ValidarPagamentoMPUseCase);
    pagamentoGatewayPort = module.get<PagamentoGatewayPort>(
      PagamentoGatewayPortKey,
    );
    mercadoPagoGatewayPort = module.get<MercadoPagoGatewayPort>(
      MercadoPagoGatewayPortKey,
    );
  });

  it('deve ser criado corretamente', () => {
    //Assert
    expect(useCase).toBeDefined();
  });

  it('deve chamar o metodo para verificar se o pagamento foi concluido com sucesso', async () => {
    //Arrange
    const resultado = { status: true, pedidoId: pedido.id };

    jest
      .spyOn(mercadoPagoGatewayPort, 'pagamentoFoiRealizadoComSucesso')
      .mockResolvedValueOnce(resultado);

    //Act
    await useCase.execute(pagamentoId);

    //Assert
    expect(
      mercadoPagoGatewayPort.pagamentoFoiRealizadoComSucesso,
    ).toBeCalledWith(pagamentoId);
  });

  it('deve chamar o metodo de atualizar pagamento com o status de pago', async () => {
    //Arrange
    const resultado = { status: true, pedidoId: pedido.id };

    jest
      .spyOn(mercadoPagoGatewayPort, 'pagamentoFoiRealizadoComSucesso')
      .mockResolvedValueOnce(resultado);

    //Act
    await useCase.execute(pagamentoId);

    //Assert
    expect(pagamentoGatewayPort.atualizarStatusPorPedidoId).toBeCalledWith(
      pedido.id,
      StatusPagamento.PAGO,
    );
  });

  it('deve chamar o metodo de atualizar pagamento com o status de fracassado', async () => {
    //Arrange
    const resultado = { status: false, pedidoId: pedido.id };

    jest
      .spyOn(mercadoPagoGatewayPort, 'pagamentoFoiRealizadoComSucesso')
      .mockResolvedValueOnce(resultado);

    //Act
    await useCase.execute(pagamentoId);

    //Assert
    expect(pagamentoGatewayPort.atualizarStatusPorPedidoId).toBeCalledWith(
      pedido.id,
      StatusPagamento.FRACASSADO,
    );
  });
});
