import { Test, TestingModule } from '@nestjs/testing';
import {PersonRepository} from "./person.repository";

describe('PersonRepository', () => {
    let repository: PersonRepository;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [],
        }).compile();

        repository = module.get<PersonRepository>(PersonRepository);
    });

    it('should be defined', () => {
        expect(PersonRepository).toBeDefined();
    });

});
