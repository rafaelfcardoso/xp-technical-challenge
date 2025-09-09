import { Repository } from 'typeorm';
import { AtivosCorretora } from '../entities/AtivosCorretora.entity';
import { AtivosCliente } from '../entities/AtivosCliente.entity';
import { AppDataSource } from '../config/database.config';

export class AssetRepository {
  private brokerAssetRepository: Repository<AtivosCorretora>;
  private clientAssetRepository: Repository<AtivosCliente>;

  constructor() {
    this.brokerAssetRepository = AppDataSource.getRepository(AtivosCorretora);
    this.clientAssetRepository = AppDataSource.getRepository(AtivosCliente);
  }

  // Broker Assets
  async findBrokerAssetByCode(codAtivo: number): Promise<AtivosCorretora | null> {
    return this.brokerAssetRepository.findOne({
      where: { codAtivo },
      select: ['codAtivo', 'qtdeAtivo', 'valor']
    });
  }

  async getBrokerAssetValue(codAtivo: number): Promise<{ valor: number } | null> {
    const result = await this.brokerAssetRepository.findOne({
      where: { codAtivo },
      select: ['valor']
    });
    return result ? { valor: result.valor } : null;
  }

  // Client Assets
  async findClientAssets(codCliente: number): Promise<AtivosCliente[]> {
    return this.clientAssetRepository.find({
      where: { codCliente },
      select: ['codCliente', 'codAtivo', 'qtdeAtivo', 'valor']
    });
  }

  async createClientAsset(assetData: Partial<AtivosCliente>): Promise<AtivosCliente> {
    const clientAsset = this.clientAssetRepository.create(assetData);
    return this.clientAssetRepository.save(clientAsset);
  }

  async updateClientAssetQuantity(codCliente: number, codAtivo: number, qtdeAtivo: number): Promise<void> {
    await this.clientAssetRepository.increment(
      { codCliente, codAtivo },
      'qtdeAtivo',
      qtdeAtivo
    );
  }

  async decrementClientAssetQuantity(codCliente: number, codAtivo: number, qtdeAtivo: number): Promise<void> {
    await this.clientAssetRepository.decrement(
      { codCliente, codAtivo },
      'qtdeAtivo',
      qtdeAtivo
    );
  }

  async findClientAsset(codCliente: number, codAtivo: number): Promise<AtivosCliente | null> {
    return this.clientAssetRepository.findOne({
      where: { codCliente, codAtivo }
    });
  }
}