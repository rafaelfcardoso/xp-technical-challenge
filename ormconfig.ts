import { DataSource } from 'typeorm';
import 'dotenv/config';

export default new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'desafio_xp',
  synchronize: false,
  logging: true,
  entities: ['src/entities/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  createDatabase: true,
});