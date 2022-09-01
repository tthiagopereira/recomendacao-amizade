import {IsString, Length} from "class-validator";

export class CreateRelationshipDto {
    @IsString()
    @Length(11,11, {message: 'CPF Invalido, precisa conter 11 digitos'})
    cpf1: string;

    @IsString()
    @Length(11,11, {message: 'CPF Invalido, precisa conter 11 digitos'})
    cpf2: string;

}
