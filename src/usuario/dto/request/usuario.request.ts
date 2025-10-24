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
  
  @IsNotEmpty({ message: 'Nome do usuario deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(50, {
    message: 'O tamanho máximo é de 50 caracteres para o nome do usuario',
  })
  nome: string = '';

   @IsNotEmpty({ message: 'Nome do usuario deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(50, {
    message: 'O tamanho máximo é de 50 caracteres para o nome do usuario',
  })
  email: string = '';

   @IsNotEmpty({ message: 'Nome do usuario deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(50, {
    message: 'O tamanho máximo é de 50 caracteres para o nome do usuario',
  })
  senha: string = '';

   @IsNotEmpty({ message: 'Nome do usuario deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(50, {
    message: 'O tamanho máximo é de 50 caracteres para o nome do usuario',
  })
  telefone: string = '';

   @IsNotEmpty({ message: 'Nome do usuario deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(50, {
    message: 'O tamanho máximo é de 50 caracteres para o nome do usuario',
  })
  endereco: string = '';

   @IsNotEmpty({ message: 'Nome do usuario deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(50, {
    message: 'O tamanho máximo é de 50 caracteres para o nome do usuario',
  })
  tipo: string = '';

  constructor(data: Partial<UsuarioRequest> = {}) {
    Object.assign(this, data);
  }
}
