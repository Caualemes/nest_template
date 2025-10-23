import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { Request } from 'express';
import { ROTA } from '../../commons/constants/url.sistema';
import { Result } from '../../commons/mensagem/mensagem';
import { MensagemSistema } from '../../commons/mensagem/mensagem.sistema';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceFindOne } from '../service/usuario.service.findone';
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerFindOne {
  constructor(private readonly usuarioServiceFindOne: UsuarioServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROTA.USUARIO.BY_ID)
  async findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioServiceFindOne.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, 'Usuario localizada com sucesso!', response, req.path, null);
  }
}
