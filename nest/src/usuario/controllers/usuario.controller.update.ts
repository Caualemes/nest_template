import { Body, Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceUpdate } from '../service/usuario.service.update';

@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerUpdate {
  constructor(private readonly usuarioServiceUpdate: UsuarioServiceUpdate) {}

  @HttpCode(HttpStatus.OK)
  @Put(ROTA.USUARIO.UPDATE)
  async update(
    @Req() res: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() usuarioRequest: UsuarioRequest,
  ): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioServiceUpdate.update(id, usuarioRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, 'Usuario alterado com sucesso !', response, res.path, null);
  }
}
