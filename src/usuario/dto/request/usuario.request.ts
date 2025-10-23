import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UsuarioRequest {
  @Type(() => Number)
  @IsOptional()
  idUsuario?: number;

  @IsNotEmpty({ message: 'Código do usuario deve ser informado' })
  @IsString({ message: 'O valor tem quer ser somente texto' })
  @MaxLength(10, {
    message: 'O tamanho máximo é de 10 caracteres para o código do usuario',
  })
  codUsuario: string = '';

  @IsNotEmpty({ message: 'Nome do usuario deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(50, {
    message: 'O tamanho máximo é de 50 caracteres para o nome do usuario',
  })
  nomeUsuario: string = '';

  constructor(data: Partial<UsuarioRequest> = {}) {
    Object.assign(this, data);
  }
}
