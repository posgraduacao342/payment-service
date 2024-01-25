import { Test, TestingModule } from '@nestjs/testing';
import {
  PagamentoGatewayPort,
  PagamentoGatewayPortKey,
} from 'src/domain/ports/out/PagamentoGatewayPort';
import { ObterPagamentosUseCase } from 'src/domain/useCases/ObterPagamentosUseCase';

describe('ObterPagamentosUseCase', () => {
  let useCase: ObterPagamentosUseCase;
  let pagamentoGatewayPort: PagamentoGatewayPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObterPagamentosUseCase,
        {
          provide: PagamentoGatewayPortKey,
          useValue: {
            obterPagamentos: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<ObterPagamentosUseCase>(ObterPagamentosUseCase);
    pagamentoGatewayPort = module.get<PagamentoGatewayPort>(
      PagamentoGatewayPortKey,
    );
  });

  it('deve ser criado corretamente', () => {
    //Assert
    expect(useCase).toBeDefined();
  });

  it('deve chamar o metodo de obter os pagamentos', async () => {
    //Act
    await useCase.execute();

    // Assert
    expect(pagamentoGatewayPort.obterPagamentos).toHaveBeenCalled();
  });
});
