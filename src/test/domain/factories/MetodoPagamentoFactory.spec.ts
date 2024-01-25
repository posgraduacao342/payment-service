import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MetodoPagamento } from 'src/domain/enums';
import { MetodoPagamentoFactory } from 'src/domain/factories/MetodoPagamentoFactory';
import { MercadoPagoGatewayPortKey } from 'src/domain/ports/out/MercadoPagoGatewayPort';
import { PagamentoGatewayPortKey } from 'src/domain/ports/out/PagamentoGatewayPort';
import { DinheiroStrategy } from 'src/domain/strategies/DinheiroStrategy';
import { MercadoPagoQRCodeStrategy } from 'src/domain/strategies/MercadoPagoQRCodeStrategy';

describe('MetodoPagamentoFactory', () => {
  let factory: MetodoPagamentoFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetodoPagamentoFactory,
        DinheiroStrategy,
        MercadoPagoQRCodeStrategy,
        {
          provide: PagamentoGatewayPortKey,
          useValue: {},
        },
        {
          provide: MercadoPagoGatewayPortKey,
          useValue: {},
        },
      ],
    }).compile();

    factory = module.get<MetodoPagamentoFactory>(MetodoPagamentoFactory);
  });

  it('deve ser criado corretamente', () => {
    //Assert
    expect(factory).toBeDefined();
  });

  it('deve retornar o metodo de pagamento por dinheiro', () => {
    //Arange and Act
    const startegy = factory.obterEstrategia(MetodoPagamento.DINHEIRO);

    //Assert
    expect(startegy).toBeInstanceOf(DinheiroStrategy);
  });

  it('deve retornar o metodo de pagamento pelo qr code do mercado pago', () => {
    //Arange and Act
    const startegy = factory.obterEstrategia(MetodoPagamento.MERCADO_PAGO);

    //Assert
    expect(startegy).toBeInstanceOf(MercadoPagoQRCodeStrategy);
  });

  it('deve retornar uma exeção com status 400', () => {
    //Arange
    const metodoPagamentoInvalido = 'metodoInvalido' as MetodoPagamento;

    // Act and Assert
    expect(() => factory.obterEstrategia(metodoPagamentoInvalido)).toThrowError(
      BadRequestException,
    );
  });
});
