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
import { MercadoPagoQRCodeStrategy } from 'src/domain/strategies/MercadoPagoQRCodeStrategy';
import { PedidoHelper } from 'src/test/helpers/PedidoHelper';

describe('MercadoPagoQRCodeStrategy', () => {
  let strategy: MercadoPagoQRCodeStrategy;
  let pagamentoGatewayPort: PagamentoGatewayPort;
  let mercadoPagoGatewayPortKey: MercadoPagoGatewayPort;

  const pedido = PedidoHelper.gerarPedido();
  const pagamento = Pagamento.criarNovoPagamento(
    pedido,
    StatusPagamento.EM_PROGRESSO,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MercadoPagoQRCodeStrategy,
        {
          provide: PagamentoGatewayPortKey,
          useValue: {
            atualizarPagamento: jest.fn(),
            deletarPagamentoPorId: jest.fn(),
          },
        },
        {
          provide: MercadoPagoGatewayPortKey,
          useValue: {
            gerarQrcode: jest.fn(),
          },
        },
      ],
    }).compile();

    strategy = module.get<MercadoPagoQRCodeStrategy>(MercadoPagoQRCodeStrategy);
    pagamentoGatewayPort = module.get<PagamentoGatewayPort>(
      PagamentoGatewayPortKey,
    );
    mercadoPagoGatewayPortKey = module.get<MercadoPagoGatewayPort>(
      MercadoPagoGatewayPortKey,
    );
  });

  it('deve ser criado corretamente', () => {
    //Assert
    expect(strategy).toBeDefined();
  });

  it('deve ser chamar o metodo de gerar o qr code corretamente', async () => {
    //Act
    await strategy.processarPagamento(pedido, pagamento);

    //Assert
    expect(mercadoPagoGatewayPortKey.gerarQrcode).toBeCalledWith(pedido);
  });

  it('deve ser chamar o metodo de atualizar pagamento passando o status do pagamento como pago', async () => {
    //Act
    await strategy.processarPagamento(pedido, pagamento);

    //Assert
    expect(pagamentoGatewayPort.atualizarPagamento).toBeCalledWith(pagamento);
  });

  it('deve deletar o pagamento', async () => {
    // Arrange
    jest
      .spyOn(pagamentoGatewayPort, 'atualizarPagamento')
      .mockRejectedValueOnce(new Error());

    // Act and Assert
    await expect(async () => {
      await strategy.processarPagamento(pedido, pagamento);
    }).rejects.toThrowError();

    // Assert
    expect(pagamentoGatewayPort.deletarPagamentoPorId).toBeCalledWith(
      pagamento.id,
    );
  });
});
