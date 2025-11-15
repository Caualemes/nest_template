import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { RestauranteResponse } from '../dto/response/restaurante.response';
import { RestauranteServiceFindAll } from '../service/restaurante.service.findall';

@Controller(ROTA.RESTAURANTE.BASE)
export class RestauranteControllerFindAll {
  constructor(private readonly restauranteServiceFindAll: RestauranteServiceFindAll) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.RESTAURANTE.LIST)
  async findAll(@Req() req: Request): Promise<Result<RestauranteResponse[]>> {
    const response = await this.restauranteServiceFindAll.findAll();
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de restaurante gerada com sucesso!',
      response,
      req.path,
      null,
    );
  }
}
