import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoGateway } from 'src/application/gateway/MercadoPagoGateway';
import { ItemMP } from 'src/infrastructure/mercadoPago/entities/ItemMp';
import { PedidoMP } from 'src/infrastructure/mercadoPago/entities/PedidoMp';
import {
  MercadoPagoPort,
  MercadoPagoPortKey,
} from 'src/infrastructure/mercadoPago/port/MercadoPagoPort';
import { PedidoHelper } from 'src/test/helpers/PedidoHelper';

describe('MercadoPagoGateway', () => {
  let service: MercadoPagoGateway;
  let mercadoPagoPort: MercadoPagoPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MercadoPagoGateway,
        {
          provide: MercadoPagoPortKey,
          useValue: {
            buscarInfoPagamento: jest.fn(),
            gerarQrcode: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MercadoPagoGateway>(MercadoPagoGateway);
    mercadoPagoPort = module.get<MercadoPagoPort>(MercadoPagoPortKey);
  });

  it('deve ser definido', () => {
    // Assert
    expect(service).toBeDefined();
  });

  it('deve chamar o método buscarInfoPagamento corretamente', async () => {
    // Arrange
    const pagamentoId = 'pagamentoId';
    const mockInfoPagamento = {
      status: 'approved',
      external_reference: 'pedidoId',
    };

    jest
      .spyOn(mercadoPagoPort, 'buscarInfoPagamento')
      .mockResolvedValueOnce(mockInfoPagamento);

    // Act
    const result = await service.pagamentoFoiRealizadoComSucesso(pagamentoId);

    // Assert
    expect(mercadoPagoPort.buscarInfoPagamento).toHaveBeenCalledWith(
      pagamentoId,
    );
    expect(result).toEqual({
      status: true,
      pedidoId: mockInfoPagamento.external_reference,
    });
  });

  it('deve chamar o método gerarQrcode corretamente', async () => {
    // Arrange
    const pedido = PedidoHelper.gerarPedido();
    const mockQrCode = 'qrcode123';

    const pedidoMP = new PedidoMP(
      pedido.id,
      pedido.preco,
      process.env.WEBHOOK_MP_URL,
      1,
    );

    pedido.itens.forEach((item) => {
      const produto = item.produto;
      const itemMP = new ItemMP(
        produto.id,
        produto.nome,
        item.quantidade,
        produto.preco,
        item.quantidade * produto.preco,
      );
      pedidoMP.adicionarItem(itemMP);
    });

    jest
      .spyOn(mercadoPagoPort, 'gerarQrcode')
      .mockResolvedValueOnce(mockQrCode);

    // Act
    const result = await service.gerarQrcode(pedido);

    // Assert
    expect(mercadoPagoPort.gerarQrcode).toHaveBeenCalledWith(pedidoMP);
    expect(result).toEqual(mockQrCode);
  });
});
