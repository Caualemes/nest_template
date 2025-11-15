import { plainToInstance } from 'class-transformer';
import { Restaurante } from 'src/restaurante/entity/restaurante.entity';
import { RestauranteRequest } from '../request/restaurante.request';
import { RestauranteResponse } from '../response/restaurante.response';
import { Usuario } from 'src/usuario/entity/usuario.entity';

export class ConverterRestaurante {
  static toRestaurante(restauranteRequest: RestauranteRequest) {
    const restaurante = new Restaurante();

    if (restauranteRequest.idRestaurante != null) {
      restaurante.idRestaurante = restauranteRequest.idRestaurante;
    }
    restaurante.nome = restauranteRequest.nome;
    restaurante.cnpj = restauranteRequest.cnpj;
    restaurante.endereco = restauranteRequest.endereco;
    restaurante.telefone = restauranteRequest.telefone;
    restaurante.horario_func = restauranteRequest.horario_func;
    
    if (restauranteRequest.id_usuario) {
      const usuario = new Usuario();
      usuario.idUsuario = restauranteRequest.id_usuario;
      restaurante.usuario = usuario;
    }

    return restaurante;
  }

  static toRestauranteResponse(restaurante: Restaurante): RestauranteResponse {
    return plainToInstance(RestauranteResponse, restaurante, {
      excludeExtraneousValues: true,
    });
  }

  static toListRestauranteResponse(restaurantes: Restaurante[] = []): RestauranteResponse[] {
    return plainToInstance(RestauranteResponse, restaurantes, {
      excludeExtraneousValues: true,
    });
  }
}