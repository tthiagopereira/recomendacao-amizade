import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import {PersonRepository} from "./repositories/person.repository";

@Module({
  controllers: [PersonController],
  providers: [PersonService, PersonRepository]
})
export class PersonModule {}
