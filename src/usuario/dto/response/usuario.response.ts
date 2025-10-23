import { Expose } from 'class-transformer';

export class UsuarioResponse {
  @Expose()
  idUsuario?: number;

  @Expose()
  codUsuario: string = '';

  @Expose()
  nomeUsuario: string = '';
}
