<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ docker-compose up
$ npm test:cov
```
### Linux - docker
 -   chmod +x .docker/entrypoint.sh 

# urls
### SWAGGER
- GET - http://localhost:3000/api
### Person
 - GET - http://localhost:3000/person
```
    [
	{
		"cpf": "11111111111",
		"name": "A"
	},
	{
		"cpf": "22222222222",
		"name": "B"
	},
]
```
 - POST - http://localhost:3000/person
```
body

{
	"cpf": "66666666666",
	"name": "F"
}

return 

{
	"cpf": "66666666666",
	"name": "F"
}
```
 - GET - http://localhost:3000/person/11111111111
```
{
	"cpf": "11111111111",
	"name": "A"
}
```
 - DELETE - http://localhost:3000/person/clean
```
    return status 204 no content
```

# Relation ship && recommendations
## urls

- POST - http://localhost:3000/relationship
```
{
	"cpf1": "77777777777",
	"cpf2": "22222222222"
}

return 

status: 200 ok
```

- GET - http://localhost:3000/recommendations/11111111111
```
[
	"77777777777",
	"44444444444",
	"55555555555",
	"66666666666"
]

return 

status: 200 ok
```