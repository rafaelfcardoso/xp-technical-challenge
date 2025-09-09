import { Repository } from 'typeorm';
import { PessoaCliente } from '../entities/PessoaCliente.entity';
import { AppDataSource } from '../config/database.config';

export class ClienteRepository {
  private repository: Repository<PessoaCliente>;

  constructor() {
    this.repository = AppDataSource.getRepository(PessoaCliente);
  }

  async findAll(): Promise<PessoaCliente[]> {
    return this.repository.find();
  }

  async findByCode(codCliente: number): Promise<PessoaCliente | null> {
    return this.repository.findOne({
      where: { codCliente },
      select: ['codCliente', 'saldo']
    });
  }

  async findByUsername(username: string): Promise<PessoaCliente[]> {
    return this.repository.find({
      where: { username },
      select: ['codCliente', 'username', 'password']
    });
  }

  async create(clientData: Partial<PessoaCliente>): Promise<PessoaCliente> {
    const client = this.repository.create(clientData);
    return this.repository.save(client);
  }

  async update(codCliente: number, updateData: Partial<PessoaCliente>): Promise<void> {
    await this.repository.update({ codCliente }, updateData);
  }

  async updateBalance(codCliente: number, amount: number): Promise<void> {
    await this.repository.increment({ codCliente }, 'saldo', amount);
  }
}