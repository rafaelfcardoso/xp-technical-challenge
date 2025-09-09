import { DataSource } from 'typeorm';
import 'dotenv/config';

// Import entities
import { PessoaCliente } from '../entities/PessoaCliente.entity';
import { AtivosCorretora } from '../entities/AtivosCorretora.entity';
import { AtivosCliente } from '../entities/AtivosCliente.entity';
import { OrdensDeCompra } from '../entities/OrdensDeCompra.entity';
import { OrdensDeVenda } from '../entities/OrdensDeVenda.entity';
import { Depositos } from '../entities/Depositos.entity';
import { Saques } from '../entities/Saques.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'investment_platform',
  synchronize: false, // Never use true in production
  logging: process.env.NODE_ENV === 'development',
  entities: [
    PessoaCliente,
    AtivosCorretora,
    AtivosCliente,
    OrdensDeCompra,
    OrdensDeVenda,
    Depositos,
    Saques,
  ],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

export default AppDataSource;