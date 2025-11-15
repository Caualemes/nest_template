import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterRestaurante } from '../dto/converter/restaurante.converter';
import { RestauranteResponse } from '../dto/response/restaurante.response';
import { Restaurante } from '../entity/restaurante.entity';

@Injectable()
export class RestauranteServiceFindOne {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,
  ) {}

  async findOne(idRestaurante: number): Promise<RestauranteResponse> {
    const restaurante = await this.findById(idRestaurante);

    if (!restaurante) {
      throw new HttpException('Restaurante não cadastrada', HttpStatus.NOT_FOUND);
    }

    return ConverterRestaurante.toRestauranteResponse(restaurante);
  }

  async findById(idRestaurante: number): Promise<Restaurante | null> {
    const restaurante = await this.restauranteRepository.findOne({
      where: { idRestaurante },
    });

    return restaurante;
  }
}
