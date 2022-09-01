import {IsString, Length} from "class-validator";

export class CreateRecomendationDto {
    @IsString()
    @Length(11,11, {message: 'CPF Invalido, precisa conter 11 digitos'})
    cpf: string;
}
