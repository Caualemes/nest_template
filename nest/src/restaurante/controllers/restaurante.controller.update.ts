import { Body, Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { RestauranteRequest } from '../dto/request/restaurante.request';
import { RestauranteResponse } from '../dto/response/restaurante.response';
import { RestauranteServiceUpdate } from '../service/restaurante.service.update';

@Controller(ROTA.RESTAURANTE.BASE)
export class RestauranteControllerUpdate {
  constructor(private readonly usuarioServiceUpdate: RestauranteServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.RESTAURANTE.UPDATE)
  async update(
    @Req() res: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() usuarioRequest: RestauranteRequest,
  ): Promise<Result<RestauranteResponse>> {
    const response = await this.usuarioServiceUpdate.update(id, usuarioRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, 'Restaurante alterado com sucesso !', response, res.path, null);
  }
}
