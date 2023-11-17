<h1>Back End Futebol Clube ⚽ 🥅</h1>

<h2>Descrição do Projeto:</h2>

Este projeto consiste na construção de um back-end dockerizado, utilizando a modelagem de dados através do Sequelize. O desenvolvimento da API é realizado utilizando o método TDD (Test-Driven Development). Além disso, o projeto integra as aplicações por meio do docker-compose, permitindo que funcionem consumindo um banco de dados.

<h2>Estrutura do Projeto:</h2>

O projeto é composto por 4 entidades importantes:

Banco de Dados - Usando um Container Docker MySQL configurado no docker-compose.

Back-end - Ambiente para implementações principaisa, sua inicialização é feita a partir do arquivo app/backend/src/server.ts. 

Front-end - Todo front-end já foi previamente feito pela Escola de Programação Trybe

Docker:O docker-compose é responsável por unir todos os serviços conteinerizados (backend, frontend, e banco de dados).

Para iniciar todos os serviços conteinerizados, utilize o comando:
```
npm run compose:up
```
Para verificar todo o funcionamento da apliação acesse a porta correta no seu navegador:
```
http://localhost:3000/
```

<h2>Observações:</h2>

Se encontrar algum problema, tiver dúvidas ou fazer alterações entre em contato.
