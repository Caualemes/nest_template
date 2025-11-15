import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { RestauranteServiceRemove } from '../service/restaurante.service.remove';

@Controller(ROTA.RESTAURANTE.BASE)
export class RestauranteControllerRemove {
  constructor(private readonly usuarioServiceRemove: RestauranteServiceRemove) {}

  @HttpCode(HttpStatus.OK) //NO_CONTENT
  @Delete(ROTA.RESTAURANTE.DELETE)
  async remove(
    @Req() res: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<void>> {
    await this.usuarioServiceRemove.remove(id);
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Restaurante excluída com sucesso!',
      null,
      res.path,
      null,
    );
  }
}
