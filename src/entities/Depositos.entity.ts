import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PessoaCliente } from './PessoaCliente.entity';

@Entity('depositos')
export class Depositos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codCliente: number;

  @Column('double')
  valor: number;

  // Relationships
  @ManyToOne(() => PessoaCliente, (cliente) => cliente.depositos)
  @JoinColumn({ name: 'codCliente' })
  cliente: PessoaCliente;
}