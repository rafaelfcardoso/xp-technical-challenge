import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PessoaCliente } from './PessoaCliente.entity';

@Entity('saques')
export class Saques {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codCliente: number;

  @Column('double')
  valor: number;

  // Relationships
  @ManyToOne(() => PessoaCliente, (cliente) => cliente.saques)
  @JoinColumn({ name: 'codCliente' })
  cliente: PessoaCliente;
}