import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterRestaurante } from '../dto/converter/restaurante.converter';
import { RestauranteRequest } from '../dto/request/restaurante.request';
import { RestauranteResponse } from '../dto/response/restaurante.response';
import { Restaurante } from '../entity/restaurante.entity';
import { Usuario } from '../../usuario/entity/usuario.entity';

@Injectable()
export class RestauranteServiceCreate {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(restauranteRequest: RestauranteRequest): Promise<RestauranteResponse> {
    
    // 1) CARREGA O USUÁRIO QUE VAI SER DONO DO RESTAURANTE
    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario: restauranteRequest.id_usuario },
    });

    if (!usuario) {
      throw new HttpException(
        'Usuário não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 2) CONVERTE DTO → ENTITY
    let restaurante = ConverterRestaurante.toRestaurante(restauranteRequest);

    // 3) SETA O USUÁRIO NA ENTITY (A FK OBRIGATÓRIA)
    restaurante.usuario = usuario;

    // 4) SALVA NO BANCO
    restaurante = await this.restauranteRepository.save(restaurante);

    // 5) RETORNO
    return ConverterRestaurante.toRestauranteResponse(restaurante);
  }
}
