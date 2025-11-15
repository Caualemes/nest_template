import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Usuario } from '../../usuario/entity/usuario.entity';

@Entity('REST_RESTAURANTE')
export class Restaurante extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'ID_RESTAURANTE',
    type: 'number',
  })
  idRestaurante?: number;

  @Column({
    name: 'NOME',
    type: 'varchar2',
    length: 10,
  })
  nome: string = '';

  @Column({
    name: 'HORARIO_FUNC',
    type: 'varchar2',
    length: 50,
  })
  horario_func: string = '';

  @Column({
    name: 'CNPJ',
    type: 'char',
    length: 500
  })
  cnpj: string = '';

  @Column({
    name: 'TELEFONE',
    type: 'varchar2',
    length: 15,
  })
  telefone: string = '';

  @Column({
    name: 'ENDERECO',
    type: 'varchar2',
    length: 100,
  })
  endereco: string = '';

@ManyToOne(() => Usuario, usuario => usuario.restaurantes)
@JoinColumn({ name: 'ID_USUARIO' }) 
usuario!: Usuario;
  
  constructor(data: Partial<Restaurante> = {}) {
    super();
    Object.assign(this, data);
  }
}