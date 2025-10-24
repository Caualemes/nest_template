import { plainToInstance } from 'class-transformer';
import { Usuario } from 'src/usuario/entity/usuario.entity';
import { UsuarioRequest } from '../request/usuario.request';
import { UsuarioResponse } from '../response/usuario.response';

export class ConverterUsuario {
  static toUsuario(usuarioRequest: UsuarioRequest) {
    const usuario = new Usuario();

    if (usuarioRequest.idUsuario != null) {
      usuario.idUsuario = usuarioRequest.idUsuario;
    }
    usuario.nome = usuarioRequest.nome;
    usuario.email = usuarioRequest.email;
    usuario.senha = usuarioRequest.senha;
    usuario.telefone = usuarioRequest.telefone;
    usuario.endereco = usuarioRequest.endereco;
    usuario.tipo = usuarioRequest.tipo;

    return usuario;
  }

  static toUsuarioResponse(usuario: Usuario): UsuarioResponse {
    return plainToInstance(UsuarioResponse, usuario, {
      excludeExtraneousValues: true,
    });
  }

  static toListUsuarioResponse(usuarios: Usuario[] = []): UsuarioResponse[] {
    return plainToInstance(UsuarioResponse, usuarios, {
      excludeExtraneousValues: true,
    });
  }
}
