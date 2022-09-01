import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import {HttpException, NotFoundException} from "@nestjs/common";
import {persons} from "./mocks/persons";

type MockRepository<T = any> = Partial<Record<any, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
});

describe('PersonService', () => {
  let service: PersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonService],
    }).compile();

    service = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('shoul findOne', () => {
    it('findOne',  () => {
        const cpf = '11111111111';
        const mock = {
          "cpf": "11111111111",
          "name": "A"
        }
        const person = service.findOne(cpf);
        expect(person).toEqual(mock);
    });

    it('findOne error',  () => {
        const cpf = '11111111112';

        const mock = {
          "cpf": "11111111111",
          "name": "A"
        }

        try {
            service.findOne(cpf);
        }catch (e) {
            expect(e).toBeInstanceOf(HttpException);
        }
    });
  })

  describe('shoul findAll', () => {
    it('findAll',  () => {
        const mock = persons();
        const person = service.findAll();
        expect(person).toEqual(mock);
    });
  })

  describe('shoul create', () => {
    it('create',  () => {
        const mock = {
            "cpf": "02594741263",
            "name": "Thiago Pereira dos Santos"
        }
        const person = service.create(mock);
        expect(person).toEqual(mock);
    });
    it('create error',  () => {
        const mock = {
            "cpf": "11111111111",
            "name": "Thiago Pereira dos Santos"
        }
        try {
            service.create(mock);
        }catch (e) {
            expect(e).toBeInstanceOf(HttpException);
        }
    });
  })

    describe('shoul clean', () => {
        it('clean',  () => {
            const person = service.clean();
            expect(person).toEqual('todos os dados apagados');
        });
    })

    describe('shoul relationship', () => {
        it('relationship',  () => {
            const mock = {
                cpf1: "11111111111",
                cpf2: "22222222222"
            }

            const relation = service.relationship(mock);
            expect(relation).toEqual(undefined);
        });

        it('relationship error',  () => {
            const mock = {
                cpf1: "11111141111",
                cpf2: "22221222222"
            }

            try {
                service.relationship(mock);
            }catch (e) {
                expect(e).toBeInstanceOf(HttpException);
            }
        });
    })

    describe('shoul recommendations', () => {
        it('recommendations',  () => {
            const mock = "11111111111";

            const relation = service.recommendations(mock);
            expect(relation).toEqual([
                "44444444444",
                "55555555555"
            ]);
        });
        it('recommendations error',  () => {
            const mock = "1111111111111";

            try {
                service.recommendations(mock);
            }catch (e) {
                expect(e).toBeInstanceOf(HttpException);
            }
        });
    })
});
