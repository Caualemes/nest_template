import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurante } from '../entity/restaurante.entity';
import { RestauranteServiceFindOne } from './restaurante.service.findone';

@Injectable()
export class RestauranteServiceRemove {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,
    private readonly service: RestauranteServiceFindOne,
  ) {}

  async remove(idRestaurante: number): Promise<void> {
    const restaurante = await this.service.findById(idRestaurante);

    if (!restaurante?.idRestaurante) {
      throw new HttpException('Restaurante não cadastrada', HttpStatus.NOT_FOUND);
    }

        await this.restauranteRepository
      .createQueryBuilder('restaurante')
      .delete()
      .from(Restaurante)
      .where('ID_RESTAURANTE = :idRestaurante', {
        idRestaurante: restaurante.idRestaurante,
      })
      .execute();
      }
}
