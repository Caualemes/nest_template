import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterRestaurante } from '../dto/converter/restaurante.converter';
import { RestauranteRequest } from '../dto/request/restaurante.request';
import { RestauranteResponse } from '../dto/response/restaurante.response';
import { Restaurante } from '../entity/restaurante.entity';
import { RestauranteServiceFindOne } from './restaurante.service.findone';

@Injectable()
export class RestauranteServiceUpdate {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,
    private restauranteServiceFindOne: RestauranteServiceFindOne,
  ) {}

  async update(idRestaurante: number, restauranteRequest: RestauranteRequest): Promise<RestauranteResponse> {
    let restaurante = ConverterRestaurante.toRestaurante(restauranteRequest);

    const restauranteCadastrada = await this.restauranteServiceFindOne.findById(idRestaurante);

    if (!restauranteCadastrada) {
      throw new HttpException('Restaurante não cadastrada', HttpStatus.NOT_FOUND);
    }

    const dadosAtualizados = Object.fromEntries(Object.entries(restaurante).filter(([_, v]) => v !== undefined));

    const restauranteAtualizada = Object.assign(restauranteCadastrada, dadosAtualizados);

    restaurante = await this.restauranteRepository.save(restauranteAtualizada);

    return ConverterRestaurante.toRestauranteResponse(restaurante);
  }
}
