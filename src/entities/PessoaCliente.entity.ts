import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { AtivosCliente } from './AtivosCliente.entity';
import { OrdensDeCompra } from './OrdensDeCompra.entity';
import { OrdensDeVenda } from './OrdensDeVenda.entity';
import { Depositos } from './Depositos.entity';
import { Saques } from './Saques.entity';

@Entity('pessoa_cliente')
export class PessoaCliente {
  @PrimaryColumn()
  codCliente: number;

  @Column('text')
  username: string;

  @Column('text')
  password: string;

  @Column('double')
  saldo: number;

  // Relationships
  @OneToMany(() => AtivosCliente, (ativosCliente) => ativosCliente.cliente)
  ativos: AtivosCliente[];

  @OneToMany(() => OrdensDeCompra, (ordem) => ordem.cliente)
  ordensDeCompra: OrdensDeCompra[];

  @OneToMany(() => OrdensDeVenda, (ordem) => ordem.cliente)
  ordensDeVenda: OrdensDeVenda[];

  @OneToMany(() => Depositos, (deposito) => deposito.cliente)
  depositos: Depositos[];

  @OneToMany(() => Saques, (saque) => saque.cliente)
  saques: Saques[];
}