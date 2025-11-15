import { Expose, Transform } from 'class-transformer';

export class RestauranteResponse {
  @Expose()
  idRestaurante?: number;

  @Expose()
  nome: string = '';

  @Expose()
  horario_func: string = '';

  @Expose()
  cnpj: string = '';

  @Expose()
  telefone: string = '';

  @Expose()
  endereco: string = '';

  @Transform(({ obj }) => obj.usuarioEntity?.idUsuario)
  @Expose()
  id_usuario!: number;
}