# Aceleradora inclusiva admin

## O que é o projeto?

O projeto aceleradora inclusiva admin tem o objetivo de gerenciar as informações referente ao show case das alunas, tais como:

- Gerenciar a entrega dos trabalhos (organizando por pastas e nomes)
- Gerenciar as novas turmas e projetos envolvidos no programa

## Fazendo o setup do projeto

- Clonar o repositório
- Instalar o projeto: `npm install`
- Instalar o sqlite3 https://www.sqlite.org/index.html
- Preencher os arquivos de estudantes `app/config/insert-students.sql`
- Rodar o script script `./scripts/create-db.sh`
- Iniciar o projeto: `node index.js >> aclr-inclusiva-admin.log &`
- Acessar http://localhost:8080/entregas

# Tech stack

1) Express Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. Able to have a http container https://expressjs.com

2) Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development. Install it using npm. https://nodemon.io/

3) Sqlite3 SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.https://www.sqlite.org/index.html

4) EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript.https://ejs.co/

5) Consign makes applications easier to develop with logical file separation and automatic script loading. https://www.npmjs.com/package/consign

6) crypto-js JavaScript library of crypto standard https://www.npmjs.com/package/crypto-js

7) Jest is a delightful JavaScript Testing Framework with a focus on simplicity. https://jestjs.io/
