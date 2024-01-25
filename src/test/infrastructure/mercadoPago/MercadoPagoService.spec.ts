import { Test, TestingModule } from '@nestjs/testing';
import { AxiosInstance } from 'axios';
import { ItemMP } from 'src/infrastructure/mercadoPago/entities/ItemMp';
import { PedidoMP } from 'src/infrastructure/mercadoPago/entities/PedidoMp';
import { QRCodeResponse } from 'src/infrastructure/mercadoPago/entities/QRCodeResponse';
import { StatusPagamentoReponse } from 'src/infrastructure/mercadoPago/entities/StatusPagamentoResponse';
import { MercadoPagoService } from 'src/infrastructure/mercadoPago/service/MercadoPagoService';

describe('MercadoPagoService', () => {
  let service: MercadoPagoService;
  let mockAxiosInstance: AxiosInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MercadoPagoService,
        {
          provide: 'AxiosIntance',
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MercadoPagoService>(MercadoPagoService);
    mockAxiosInstance = module.get('AxiosIntance');
  });

  it('deve ser definido', () => {
    // Assert
    expect(service).toBeDefined();
  });

  it('deve chamar o método get corretamente ao buscar informações de pagamento', async () => {
    // Arrange
    const pagamentoId = 'pagamentoId';
    const mockResponse: StatusPagamentoReponse = {
      status: 'approved',
      external_reference: 'externalReferenceId',
    };

    jest
      .spyOn(mockAxiosInstance, 'get')
      .mockResolvedValueOnce({ data: mockResponse });

    // Act
    const result = await service.buscarInfoPagamento(pagamentoId);

    // Assert
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      `/v1/payments/${pagamentoId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
        },
      },
    );
    expect(result).toEqual(mockResponse);
  });

  it('deve chamar o método post corretamente ao gerar QR code', async () => {
    // Arrange
    const mockPedidoMP = new PedidoMP('pedidoId', 10, 'url', 1);
    mockPedidoMP.adicionarItem(new ItemMP('sku', 'title', 1, 10, 10));

    const mockResponse: QRCodeResponse = {
      qr_data: 'qrCode',
    };

    jest
      .spyOn(mockAxiosInstance, 'post')
      .mockResolvedValueOnce({ data: mockResponse });

    // Act
    const result = await service.gerarQrcode(mockPedidoMP);

    // Assert
    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
      '/instore/orders/qr/seller/collectors/1467136605/pos/test123456/qrs',
      mockPedidoMP,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
        },
      },
    );
    expect(result).toEqual(mockResponse.qr_data);
  });
});
