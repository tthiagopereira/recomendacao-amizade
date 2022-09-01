import {IsString, Length} from "class-validator";

export class CreatePersonDto {
    @IsString()
    @Length(11,11, {message: 'CPF Invalido, precisa conter 11 digitos'})
    cpf: string;

    @IsString()
    name: string;
}
