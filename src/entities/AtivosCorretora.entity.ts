import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AtivosCliente } from './AtivosCliente.entity';
import { OrdensDeCompra } from './OrdensDeCompra.entity';
import { OrdensDeVenda } from './OrdensDeVenda.entity';

@Entity('ativos_corretora')
export class AtivosCorretora {
  @PrimaryGeneratedColumn()
  codAtivo: number;

  @Column('varchar', { length: 5 })
  ticker: string;

  @Column('int')
  qtdeAtivo: number;

  @Column('double')
  valor: number;

  // Relationships
  @OneToMany(() => AtivosCliente, (ativosCliente) => ativosCliente.ativo)
  clientesComAtivo: AtivosCliente[];

  @OneToMany(() => OrdensDeCompra, (ordem) => ordem.ativo)
  ordensDeCompra: OrdensDeCompra[];

  @OneToMany(() => OrdensDeVenda, (ordem) => ordem.ativo)
  ordensDeVenda: OrdensDeVenda[];
}