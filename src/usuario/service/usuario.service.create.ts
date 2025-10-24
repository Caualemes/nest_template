import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterUsuario } from '../dto/converter/usuario.converter';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { Usuario } from '../entity/usuario.entity';

@Injectable()
export class UsuarioServiceCreate {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(usuarioRequest: UsuarioRequest): Promise<UsuarioResponse> {
    let usuario = ConverterUsuario.toUsuario(usuarioRequest);

    const usuarioCadastrada = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .where('usuario.nome =:nome', { nome: usuario.nome })
      .getOne();

    usuario = await this.usuarioRepository.save(usuario);

    return ConverterUsuario.toUsuarioResponse(usuario);
  }
}
