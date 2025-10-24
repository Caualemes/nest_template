import { Expose } from 'class-transformer';

export class UsuarioResponse {
  @Expose()
  idUsuario?: number;

  @Expose()
  nome: string = '';

  @Expose()
  email: string = '';

  @Expose()
  telefone: string = '';

  @Expose()
  senha: string = '';

  @Expose()
  endereco: string = '';

  @Expose()
  tipo: string = '';
}
