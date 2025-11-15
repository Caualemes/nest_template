import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { RestauranteRequest } from '../dto/request/restaurante.request';
import { RestauranteResponse } from '../dto/response/restaurante.response';
import { RestauranteServiceCreate } from '../service/restaurante.service.create';

@Controller(ROTA.RESTAURANTE.BASE)
export class RestauranteControllerCreate {
  constructor(private readonly restauranteServiceCreate: RestauranteServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.RESTAURANTE.CREATE)
  async create(
    @Req() res: Request,
    @Body() restauranteRequest: RestauranteRequest,
  ): Promise<Result<RestauranteResponse>> {
    const response = await this.restauranteServiceCreate.create(restauranteRequest);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Restaurante cadastrado com sucesso!',
      response,
      res.path,
      null,
    );
  }
}
