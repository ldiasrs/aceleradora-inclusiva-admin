# Aceleradora inclusiva admin
![Image of Yaktocat](./Aceleradora-ADM.png)

## Objetivo projeto?

1) Possibilitar que as pessoas estutantes possame ver e divulgar seus trabalhos o quanto antes.

2) Otimizar o tempo das pessoas colaboradoras que públicam os trabalhos automatizando o processo de entrega e manutenção.

## Setup do projeto

- Clonar o repositório show case ADM `git clone https://github.com/ldiasrs/aceleradora-inclusiva-admin.git`
- Clonar o repositório show case WEB `git clone https://github.com/ldiasrs/aceleradora-inclusiva-showcase-web.git`
- Os projetos devem ficar na mesma pasta Exemplo:
  ```
  machine$% ls 
  aceleradora-inclusiva-admin/        aceleradora-inclusiva-showcase-web/                
  ```
- Instalar o sqlite3 seguindo esse link https://www.sqlite.org/index.html
- Entrar na pasta do projeto ADM: `cd aceleradora-inclusiva-admin`
- Instalar o projeto ADM: `npm install`
- Configurar o banco de dados: `npm run dbcreate`
- Iniciar aplicação: `npm start` (logs ficaram em: `aceleradora-admin.log`)
- Fazer o upload dos trabalhos acessando a URL: http://localhost:8080/entregas

## Como fazer o upload de trabalhos e publicação no Show Case WEB

- Depois de feito as entregas de trabalhos, você pode normalizar os arquivos com o comando `npm run unzipfolders`
- Agora vamos criar o Pull Request para o projeto Show Case WEB, onde os trabalhos serão publicados.
- Entrar na pasta do projeto WEB: `cd ../aceleradora-inclusiva-showcase-web`
- Criar um branch `git pull && git checkout -b turma-x-trabalhos-2020-03-05`
- Fazer o commit e push das alterações `git add . && git commit -m "Novos trabalhos turma x && git push"`
- Criar o Pull Request com as alterações no projeto web nesse link https://github.com/ldiasrs/aceleradora-inclusiva-showcase-web/pulls
- Falar com alguma pessoa resposável para que o PR seja aprovado e o projeto show case possa ser atualizado com os novos trabalhos.

## Como cadastrar novas turmas e alunas e publicar no Show Case WEB
<Em construção>

# Tech stack

1) Express Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. Able to have a http container https://expressjs.com

2) Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development. Install it using npm. https://nodemon.io/

3) Sqlite3 SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.https://www.sqlite.org/index.html

4) EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript.https://ejs.co/

5) Consign makes applications easier to develop with logical file separation and automatic script loading. https://www.npmjs.com/package/consign

6) crypto-js JavaScript library of crypto standard https://www.npmjs.com/package/crypto-js

7) Jest is a delightful JavaScript Testing Framework with a focus on simplicity. https://jestjs.io/
