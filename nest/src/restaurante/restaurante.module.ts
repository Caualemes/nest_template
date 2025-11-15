import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteControllerCreate } from './controllers/restaurante.controller.create';
import { RestauranteControllerFindAll } from './controllers/restaurante.controller.findall';
import { RestauranteControllerFindOne } from './controllers/restaurante.controller.findone';
import { RestauranteControllerRemove } from './controllers/restaurante.controller.remove';
import { RestauranteControllerUpdate } from './controllers/restaurante.controller.update';
import { Restaurante } from './entity/restaurante.entity';
import { RestauranteServiceCreate } from './service/restaurante.service.create';
import { RestauranteServiceFindAll } from './service/restaurante.service.findall';
import { RestauranteServiceFindOne } from './service/restaurante.service.findone';
import { RestauranteServiceRemove } from './service/restaurante.service.remove';
import { RestauranteServiceUpdate } from './service/restaurante.service.update';
import { Usuario } from 'src/usuario/entity/usuario.entity';

const restauranteControllers = [
  RestauranteControllerFindAll,
  RestauranteControllerFindOne,
  RestauranteControllerCreate,
  RestauranteControllerUpdate,
  RestauranteControllerRemove,
];

const restauranteServices = [
  RestauranteServiceCreate,
  RestauranteServiceUpdate,
  RestauranteServiceRemove,
  RestauranteServiceFindAll,
  RestauranteServiceFindOne,
];

@Module({
  imports: [TypeOrmModule.forFeature([Restaurante, Usuario])],
  controllers: [...restauranteControllers],
  providers: [...restauranteServices],
  exports: [TypeOrmModule, ...restauranteServices],
})
export class RestauranteModule {}
