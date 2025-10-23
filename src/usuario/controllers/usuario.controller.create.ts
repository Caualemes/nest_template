import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceCreate } from '../service/usuario.service.create';

@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerCreate {
  constructor(private readonly usuarioServiceCreate: UsuarioServiceCreate) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROTA.USUARIO.CREATE)
  async create(
    @Req() res: Request,
    @Body() usuarioRequest: UsuarioRequest,
  ): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioServiceCreate.create(usuarioRequest);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      'Usuario cadastrada com sucesso!',
      response,
      res.path,
      null,
    );
  }
}
