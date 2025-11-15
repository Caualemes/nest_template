import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceFindAll } from '../service/usuario.service.findall';

@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerFindAll {
  constructor(private readonly usuarioServiceFindAll: UsuarioServiceFindAll) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.USUARIO.LIST)
  async findAll(@Req() req: Request): Promise<Result<UsuarioResponse[]>> {
    const response = await this.usuarioServiceFindAll.findAll();
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      'Lista de usuario gerada com sucesso!',
      response,
      req.path,
      null,
    );
  }
}
