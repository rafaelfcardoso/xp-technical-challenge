import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PessoaCliente } from './PessoaCliente.entity';
import { AtivosCorretora } from './AtivosCorretora.entity';

@Entity('ativos_cliente')
export class AtivosCliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codCliente: number;

  @Column()
  codAtivo: number;

  @Column('int')
  qtdeAtivo: number;

  @Column('double')
  valor: number;

  // Relationships
  @ManyToOne(() => PessoaCliente, (cliente) => cliente.ativos)
  @JoinColumn({ name: 'codCliente' })
  cliente: PessoaCliente;

  @ManyToOne(() => AtivosCorretora, (ativo) => ativo.clientesComAtivo)
  @JoinColumn({ name: 'codAtivo' })
  ativo: AtivosCorretora;
}