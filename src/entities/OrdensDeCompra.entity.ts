import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { PessoaCliente } from './PessoaCliente.entity';
import { AtivosCorretora } from './AtivosCorretora.entity';

@Entity('ordens_de_compra')
export class OrdensDeCompra {
  @PrimaryColumn()
  codCliente: number;

  @PrimaryColumn()
  codAtivo: number;

  @Column('int')
  qtdeAtivo: number;

  // Relationships
  @ManyToOne(() => PessoaCliente, (cliente) => cliente.ordensDeCompra)
  @JoinColumn({ name: 'codCliente' })
  cliente: PessoaCliente;

  @ManyToOne(() => AtivosCorretora, (ativo) => ativo.ordensDeCompra)
  @JoinColumn({ name: 'codAtivo' })
  ativo: AtivosCorretora;
}