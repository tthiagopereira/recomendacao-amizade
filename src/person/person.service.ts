import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import {CreateRelationshipDto} from "./dto/create-relationship.dto";
import {PersonRepository} from "./repositories/person.repository";
import {CreateRecomendationDto} from "./dto/create-recomendation.dto";

@Injectable()
export class PersonService {

  constructor(private readonly personRepository: PersonRepository) {}

  create(createPersonDto: CreatePersonDto) {
    const person = this.personRepository.findOne(createPersonDto.cpf);

    if(person) {
      throw new HttpException(
          `Usuário já cadastrado`,
          HttpStatus.BAD_REQUEST
      )
    }

    this.personRepository.create(createPersonDto);
  }

  findAll() {
    return this.personRepository.findAll();
  }

  findOne(cpf: string) {
    const person = this.personRepository.findOne(cpf)

    if(!person) {
      throw new HttpException(
          `Usuário não encontrado ${cpf}`,
          HttpStatus.NOT_FOUND
      )
    }

    return person;
  }

  clean() {
    this.personRepository.clean();
    return `todos os dados apagados`;
  }

  relationship(relationshipDto: CreateRelationshipDto) {
    const {cpf1, cpf2} = relationshipDto;
    const person1 = this.personRepository.findOne(cpf1);
    const person2 = this.personRepository.findOne(cpf2);

    if(!person1 || !person2 || cpf1 === cpf2) {
      throw new HttpException(
          'Error ao registrar relacao',
          HttpStatus.NOT_FOUND
      )
    }

    this.personRepository.createRelations(relationshipDto);

  }

  recommendations(recomendationDto: CreateRecomendationDto) {
    const { cpf } = recomendationDto;

    if(cpf.length != 11) {
        throw new HttpException(
            'Cpf deve conter 11 digitos',
            HttpStatus.BAD_REQUEST
        )
    }

    this.findOne(cpf);
    const myFriends = this.myFriends(cpf)
    const friendsOfFriends = this.friendsOfFriends(myFriends, cpf);
    return this.relatedFriends(friendsOfFriends);

  }

  myFriends(cpf: string) {
    const relationships = this.personRepository.findAllRelations();

    const friends = relationships.map(function (person) {
        if(person.cpf1 === cpf) {
          return person.cpf2;
        }
        if(person.cpf2 === cpf) {
          return person.cpf1
        }
      })

      return friends.filter(function (value) {
        if(value) {
          return value
        }
      });
  }

  friendsOfFriends(myFriends: string[], cpfSearch: string) {
    let friendsOfFriends = [];
    const relationships = this.personRepository.findAllRelations();
    for(const cpf of myFriends) {
      for (const relation of relationships) {

        if (relation.cpf1 === cpf && relation.cpf2 !== cpfSearch) {
          friendsOfFriends.push(relation.cpf2)
        }

        if (relation.cpf2 === cpf && relation.cpf1 !== cpfSearch) {
          friendsOfFriends.push(relation.cpf1)
        }
      }

    }
    return friendsOfFriends;
  }

  relatedFriends(friendsOfFriends: string[]) {
    let accountFriends = [];

    const removeElementRepet = friendsOfFriends.filter((element, i) => friendsOfFriends.indexOf(element) === i);

    for (const element of removeElementRepet) {
      let accounts = 0;
      for (const friend of friendsOfFriends) {
        if(element === friend) {
          accounts++;
        }
      }
      accountFriends.push({
        cpf: element,
        order: accounts
      })
    }

    accountFriends = accountFriends.sort(function (item1, item2) {
      if(item1.order < item2.order) {
        return 1;
      }
      if(item1.order > item2.order) {
        return -1;
      }
      return 0;
    })

    return accountFriends.map((item) => item.cpf);
  }

}
