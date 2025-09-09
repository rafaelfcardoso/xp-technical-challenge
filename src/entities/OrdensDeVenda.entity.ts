import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PessoaCliente } from './PessoaCliente.entity';
import { AtivosCorretora } from './AtivosCorretora.entity';

@Entity('ordens_de_venda')
export class OrdensDeVenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codCliente: number;

  @Column()
  codAtivo: number;

  @Column('int')
  qtdeAtivo: number;

  // Relationships
  @ManyToOne(() => PessoaCliente, (cliente) => cliente.ordensDeVenda)
  @JoinColumn({ name: 'codCliente' })
  cliente: PessoaCliente;

  @ManyToOne(() => AtivosCorretora, (ativo) => ativo.ordensDeVenda)
  @JoinColumn({ name: 'codAtivo' })
  ativo: AtivosCorretora;
}