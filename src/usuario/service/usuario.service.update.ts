import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterUsuario } from '../dto/converter/usuario.converter';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { Usuario } from '../entity/usuario.entity';
import { UsuarioServiceFindOne } from './usuario.service.findone';

@Injectable()
export class UsuarioServiceUpdate {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private usuarioServiceFindOne: UsuarioServiceFindOne,
  ) {}

  async update(idUsuario: number, usuarioRequest: UsuarioRequest): Promise<UsuarioResponse> {
    let usuario = ConverterUsuario.toUsuario(usuarioRequest);

    const usuarioCadastrada = await this.usuarioServiceFindOne.findById(idUsuario);

    if (!usuarioCadastrada) {
      throw new HttpException('Usuario não cadastrada', HttpStatus.NOT_FOUND);
    }

    const dadosAtualizados = Object.fromEntries(Object.entries(usuario).filter(([_, v]) => v !== undefined));

    const usuarioAtualizada = Object.assign(usuarioCadastrada, dadosAtualizados);

    usuario = await this.usuarioRepository.save(usuarioAtualizada);

    return ConverterUsuario.toUsuarioResponse(usuario);
  }
}
