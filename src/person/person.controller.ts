import {Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import {CreateRelationshipDto} from "./dto/create-relationship.dto";

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post('person')
  @HttpCode(HttpStatus.OK)
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get('person')
  findAll() {
    return this.personService.findAll();
  }

  @Get('person/:cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.personService.findOne(cpf);
  }

  @Delete('person/clean')
  @HttpCode(HttpStatus.NO_CONTENT)
  clean() {
    return this.personService.clean();
  }

  @Post('relationship')
  @HttpCode(HttpStatus.OK)
  relationship(@Body() relationshipDto: CreateRelationshipDto) {
    return this.personService.relationship(relationshipDto);
  }

  @Get('recommendations/:cpf')
  recommendations(@Param('cpf') cpf: string) {
    return this.personService.recommendations({cpf});
  }

}
