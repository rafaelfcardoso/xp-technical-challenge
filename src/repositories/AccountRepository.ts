import { Repository } from 'typeorm';
import { Depositos } from '../entities/Depositos.entity';
import { Saques } from '../entities/Saques.entity';
import { AppDataSource } from '../config/database.config';

export class AccountRepository {
  private depositRepository: Repository<Depositos>;
  private withdrawalRepository: Repository<Saques>;

  constructor() {
    this.depositRepository = AppDataSource.getRepository(Depositos);
    this.withdrawalRepository = AppDataSource.getRepository(Saques);
  }

  async createDeposit(depositData: Partial<Depositos>): Promise<Depositos> {
    const deposit = this.depositRepository.create(depositData);
    return this.depositRepository.save(deposit);
  }

  async createWithdrawal(withdrawalData: Partial<Saques>): Promise<Saques> {
    const withdrawal = this.withdrawalRepository.create(withdrawalData);
    return this.withdrawalRepository.save(withdrawal);
  }

  async findDepositsByClient(codCliente: number): Promise<Depositos[]> {
    return this.depositRepository.find({
      where: { codCliente },
      relations: ['cliente']
    });
  }

  async findWithdrawalsByClient(codCliente: number): Promise<Saques[]> {
    return this.withdrawalRepository.find({
      where: { codCliente },
      relations: ['cliente']
    });
  }
}