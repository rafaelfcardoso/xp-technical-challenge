import { Repository } from 'typeorm';
import { OrdensDeCompra } from '../entities/OrdensDeCompra.entity';
import { OrdensDeVenda } from '../entities/OrdensDeVenda.entity';
import { AppDataSource } from '../config/database.config';

export class InvestmentRepository {
  private buyOrderRepository: Repository<OrdensDeCompra>;
  private sellOrderRepository: Repository<OrdensDeVenda>;

  constructor() {
    this.buyOrderRepository = AppDataSource.getRepository(OrdensDeCompra);
    this.sellOrderRepository = AppDataSource.getRepository(OrdensDeVenda);
  }

  async createBuyOrder(orderData: Partial<OrdensDeCompra>): Promise<OrdensDeCompra> {
    const buyOrder = this.buyOrderRepository.create(orderData);
    return this.buyOrderRepository.save(buyOrder);
  }

  async createSellOrder(orderData: Partial<OrdensDeVenda>): Promise<OrdensDeVenda> {
    const sellOrder = this.sellOrderRepository.create(orderData);
    return this.sellOrderRepository.save(sellOrder);
  }

  async findBuyOrdersByClient(codCliente: number): Promise<OrdensDeCompra[]> {
    return this.buyOrderRepository.find({
      where: { codCliente },
      relations: ['cliente', 'ativo']
    });
  }

  async findSellOrdersByClient(codCliente: number): Promise<OrdensDeVenda[]> {
    return this.sellOrderRepository.find({
      where: { codCliente },
      relations: ['cliente', 'ativo']
    });
  }

  async findBuyOrdersByAsset(codAtivo: number): Promise<OrdensDeCompra[]> {
    return this.buyOrderRepository.find({
      where: { codAtivo },
      relations: ['cliente', 'ativo']
    });
  }

  async findSellOrdersByAsset(codAtivo: number): Promise<OrdensDeVenda[]> {
    return this.sellOrderRepository.find({
      where: { codAtivo },
      relations: ['cliente', 'ativo']
    });
  }
}