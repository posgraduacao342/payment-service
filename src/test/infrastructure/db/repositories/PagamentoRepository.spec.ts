import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MetodoPagamento, StatusPagamento } from 'src/domain/enums';
import * as mongoose from 'mongoose';
import { PagamentoRepository } from 'src/infrastructure/db/repositories/PagamentoRepository';
import {
  PagamentoEntity,
  PagamentoEntityDocument,
} from 'src/infrastructure/db/entities/PagamentoEntity';
import { PagamentoRepositoryPort } from 'src/infrastructure/db/repositories/PagamentoRepositoryPort';

describe('PagamentoRepository', () => {
  let repository: PagamentoRepositoryPort;
  let mockPagamentoModel: mongoose.Model<PagamentoEntityDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagamentoRepository,
        {
          provide: getModelToken(PagamentoEntity.name),
          useValue: {
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<PagamentoRepositoryPort>(PagamentoRepository);
    mockPagamentoModel = module.get(getModelToken(PagamentoEntity.name));
  });

  it('deve ser definido', () => {
    // Assert
    expect(repository).toBeDefined();
  });

  it('deve chamar o método updateOne corretamente ao atualizar o status por pedido ID', async () => {
    // Arrange
    const pedidoId = 'pedidoId';
    const statusPagamento = StatusPagamento.PAGO;

    // Act
    await repository.atualizarStatusPorPedidoId(pedidoId, statusPagamento);

    // Assert
    expect(mockPagamentoModel.updateOne).toHaveBeenCalledWith(
      { pedidoId },
      { statusPagamento },
    );
  });

  it('deve chamar o método deleteOne corretamente ao deletar o pagamento por ID', async () => {
    // Arrange
    const pagamentoId = 'pagamentoId';

    // Act
    await repository.deletarPagamentoPorId(pagamentoId);

    // Assert
    expect(mockPagamentoModel.deleteOne).toHaveBeenCalledWith({
      _id: pagamentoId,
    });
  });

  it('deve chamar o método create corretamente ao criar um pagamento', async () => {
    // Arrange
    const pagamento: PagamentoEntity = {
      _id: 'id',
      dataAtualizacao: new Date(),
      dataCriacao: new Date(),
      metodoPagamento: MetodoPagamento.DINHEIRO,
      pedidoId: 'pedidoId',
      statusPagamento: StatusPagamento.PAGO,
      valorPagamento: 10,
    };

    // Act
    await repository.criarPagamento(pagamento);

    // Assert
    expect(mockPagamentoModel.create).toHaveBeenCalledWith(pagamento);
  });

  it('deve chamar o método findOne corretamente ao obter o pagamento por ID do pedido', async () => {
    // Arrange
    const pedidoId = 'pedidoId';

    // Act
    await repository.obterPagamentoPorIdDoPedido(pedidoId);

    // Assert
    expect(mockPagamentoModel.findOne).toHaveBeenCalledWith({ pedidoId });
  });

  it('deve chamar o método findByIdAndUpdate corretamente ao atualizar o pagamento', async () => {
    // Arrange
    const pagamento: PagamentoEntity = {
      _id: 'id',
      dataAtualizacao: new Date(),
      dataCriacao: new Date(),
      metodoPagamento: MetodoPagamento.DINHEIRO,
      pedidoId: 'pedidoId',
      statusPagamento: StatusPagamento.PAGO,
      valorPagamento: 10,
    };

    // Act
    await repository.atualizarPagamento(pagamento);

    // Assert
    expect(mockPagamentoModel.findByIdAndUpdate).toHaveBeenCalledWith(
      pagamento._id,
      pagamento,
    );
  });

  it('deve chamar o método find corretamente ao obter pagamentos', async () => {
    // Act
    await repository.obterPagamentos();

    // Assert
    expect(mockPagamentoModel.find).toHaveBeenCalled();
  });
});
