import {Injectable} from "@nestjs/common";
import {persons, relationships, relationshipsGrafo} from "../mocks/persons";
import {CreatePersonDto} from "../dto/create-person.dto";
import {CreateRelationshipDto} from "../dto/create-relationship.dto";

@Injectable()
export class PersonRepository {
    private persons = persons();
    private relationships = relationships();

    findOne(cpf: string) {
        return this.persons.find((person) => person.cpf === cpf)
    }

    create(createPersonDto: CreatePersonDto) {
        this.persons.push(createPersonDto);
    }

    findAll() {
        return this.persons;
    }

    clean() {
        this.persons = [];
        this.relationships = [];
    }

    createRelations(relationshipDto: CreateRelationshipDto) {
        const {cpf1, cpf2} = relationshipDto;
        this.relationships.push({
            cpf1,
            cpf2,
        })
    }

    findAllRelations() {
        return this.relationships;
    }

     findAllRelationsGrafo() {
        return relationshipsGrafo();
    }
}