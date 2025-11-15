import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterUsuario } from '../dto/converter/usuario.converter';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { Usuario } from '../entity/usuario.entity';

@Injectable()
export class UsuarioServiceFindAll {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<UsuarioResponse[]> {
    const usuarios = await this.usuarioRepository.createQueryBuilder('usuario').getMany();

    return ConverterUsuario.toListUsuarioResponse(usuarios);
  }
}
