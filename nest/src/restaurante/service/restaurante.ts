import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterRestaurante } from '../dto/converter/restaurante.converter';
import { RestauranteResponse } from '../dto/response/restaurante.response';
import { Restaurante } from '../entity/restaurante.entity';

@Injectable()
export class RestauranteServiceFindAll {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,
  ) {}

  async findAll(): Promise<RestauranteResponse[]> {
    const restaurantes = await this.restauranteRepository.createQueryBuilder('restaurante').getMany();

    return ConverterRestaurante.toListRestauranteResponse(restaurantes);
  }
}
