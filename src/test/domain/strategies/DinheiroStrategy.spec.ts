import { Test, TestingModule } from '@nestjs/testing';
import { Pagamento } from 'src/domain/entities/Pagamento';
import { StatusPagamento } from 'src/domain/enums';
import {
  PagamentoGatewayPort,
  PagamentoGatewayPortKey,
} from 'src/domain/ports/out/PagamentoGatewayPort';
import { DinheiroStrategy } from 'src/domain/strategies/DinheiroStrategy';
import { PedidoHelper } from 'src/test/helpers/PedidoHelper';

describe('DinheiroStrategy', () => {
  let strategy: DinheiroStrategy;
  let pagamentoGatewayPort: PagamentoGatewayPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DinheiroStrategy,
        {
          provide: PagamentoGatewayPortKey,
          useValue: {
            atualizarPagamento: jest.fn(),
          },
        },
      ],
    }).compile();

    strategy = module.get<DinheiroStrategy>(DinheiroStrategy);
    pagamentoGatewayPort = module.get<PagamentoGatewayPort>(
      PagamentoGatewayPortKey,
    );
  });

  it('deve ser criado corretamente', () => {
    //Assert
    expect(strategy).toBeDefined();
  });

  it('deve ser chamar o metodo de atualizar pagamento passando o status do pagamento como pago', async () => {
    //Arrange
    const pedido = PedidoHelper.gerarPedido();
    const pagamento = Pagamento.criarNovoPagamento(
      pedido,
      StatusPagamento.EM_PROGRESSO,
    );

    //Act
    await strategy.processarPagamento(pedido, pagamento);

    //Assert
    expect(pagamentoGatewayPort.atualizarPagamento).toBeCalledWith(pagamento);
  });
});
