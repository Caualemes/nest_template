import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';

@Entity('REST_USUARIO')
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'ID_USUARIO',
    type: 'number',
  })
  idUsuario?: number;

  @Column({
    name: 'NOME',
    type: 'varchar2',
    length: 10,
  })
  nome: string = '';

  @Column({
    name: 'EMAIL',
    type: 'varchar2',
    length: 50,
  })
  email: string = '';

  @Column({
    name: 'SENHA',
    type: 'varchar2',
    length: 500
  })
  senha: string = '';

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

  @Column({
    name: 'TIPO',
    type: 'varchar2',
    length: 20,
  })
  tipo: string = '';
  
  constructor(data: Partial<Usuario> = {}) {
    super();
    Object.assign(this, data);
  }
}
