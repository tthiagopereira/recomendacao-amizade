import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import {persons} from "./mocks/persons";
import {PersonRepository} from "./repositories/person.repository";

describe('PersonController', () => {
  let controller: PersonController;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [PersonService, PersonRepository],
    }).compile();

    controller = module.get<PersonController>(PersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create', function () {
    const person = {
      "cpf": "02594741263",
      "name": "Thiago Pereira dos Santos"
    }
    const personCreate = controller.create(person);
    expect(personCreate).toEqual(person);
  });

  it('should findAll', function () {
    const person = persons();
    const personCreate = controller.findAll();
    expect(personCreate).toEqual(person);
  });

  it('should findOne', function () {
    const person = '11111111111';
    const personCreate = controller.findOne(person);
    expect(personCreate).toEqual({"cpf": "11111111111", "name": "A"});
  });

  it('should relationship', function () {
    const relationship = {
      "cpf1": "11111111111",
      "cpf2": "22222222222"
    };
    const personCreate = controller.relationship(relationship);
    expect(personCreate).toEqual(undefined);
  });

  it('should recommendations', function () {
    const recommendations = "11111111111";
    const personCreate = controller.recommendations(recommendations);
    expect(personCreate).toEqual( ["44444444444", "55555555555"]);
  });

  it('should findOne', function () {
    const personCreate = controller.clean();
    expect(personCreate).toEqual("todos os dados apagados");
  });

});
