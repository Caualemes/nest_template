import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class RestauranteRequest {
  @Type(() => Number)
  @IsOptional()
  idRestaurante?: number;

  @IsNotEmpty({ message: 'Nome do restaurante deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(50, {
    message: 'O tamanho máximo é de 50 caracteres para o nome do restaurante',
  })
  nome: string = '';

  @IsNotEmpty({ message: 'CNPJ do restaurante deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(500, {
    message: 'O tamanho máximo é de 500 caracteres para o CNPJ',
  })
  cnpj: string = '';

  @IsNotEmpty({ message: 'Horário de funcionamento do restaurante deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(50, {
    message: 'O tamanho máximo é de 50 caracteres para o horário de funcionamento',
  })
  horario_func: string = '';

  @IsNotEmpty({ message: 'Telefone do restaurante deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(15, {
    message: 'O tamanho máximo é de 15 caracteres para o telefone',
  })
  telefone: string = '';

  @IsNotEmpty({ message: 'Endereço do restaurante deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(100, {
    message: 'O tamanho máximo é de 100 caracteres para o endereço',
  })
  endereco: string = '';

  @IsNotEmpty({ message: 'Tipo do restaurante deve ser informado' })
  @IsString({ message: 'A informação só pode conter texto' })
  @MaxLength(20, { 
    message: 'O tamanho máximo é de 20 caracteres para o tipo',
  })
  tipo: string = '';

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'O ID do usuário proprietário deve ser informado' })
  id_usuario!: number;

  constructor(data: Partial<RestauranteRequest> = {}) {
    Object.assign(this, data);
  }
}