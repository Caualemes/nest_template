import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { RestauranteResponse } from '../dto/response/restaurante.response';
import { RestauranteServiceFindOne } from '../service/restaurante.service.findone';
@Controller(ROTA.RESTAURANTE.BASE)
export class RestauranteControllerFindOne {
  constructor(private readonly restauranteServiceFindOne: RestauranteServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.RESTAURANTE.BY_ID)
  async findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number): Promise<Result<RestauranteResponse>> {
    const response = await this.restauranteServiceFindOne.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, 'Restaurante localizada com sucesso!', response, req.path, null);
  }
}
