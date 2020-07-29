# Backend api para o app Sami
> Start do backend (api) - Configurando o ambiente (Atenção: ao testar ignorar a configuração de ambiente e executar somente npm update)

* npm init -y
* npm install multer --save
* npm install sharp --save
* npm install jose --save
* npm install bcryptjs --save
* npm install express --save
* npm install sequelize --save
* npm install sequelize-cli --save
* npm install pg pg-hstore

## Primeira fase 

### Implementando as calls da api (básica, sem o sequelize) utilizando design patterns, otimização de código e boas práticas

Foi implementada a estrutura inicial da API contendo as seguintes pastas / hierarquia:
* Raiz em backendAPI
    * ./controllers - controladores utilizados na API (implementação do consumo via rotas "proximo item"):
        * ./docs - documentação de acesso as APIS via Postman

        * ./users/auth - Formulário de primeiro acesso
        * ./users/cad - Formulário de cadastro
        * ./users/profile - Upload e optimização de imagens

* ./database - coniguração das credenciais no sequelize:

## Segunda fase

### Configurando para o Sequelize

* .sequelizerc com (config em ./database/config/db.js e migrations-path em ./database/migrations)
* ./database/config/db - credenciais no sequelize:

### Implementando os Models para o Sequelize

* ./models/Users - Modelo da tabela usuários
* ./models/Addresses - Modelo da tabela endereços
* ./models/Plans - Modelo da tabela planos

## Terceira fase 

### Implementando o banco de dados relacional utilizando seeders e migrations via Sequelize

* cd backendAPI
* npx sequelize db:create
* npx sequelize migration:create --name=users
* npx sequelize migration:create --name=plans

* npx sequelize seed:create --name=users
* npx sequelize seed:create --name=plans

* npx sequelize db:migrate
* npx sequelize db:seed:all

## Quarta fase 

### Implementando o cadastro

* ./controllers/users/cad - implementação do CRUD de cadastro

### Implementando o acesso ao cadastro

* ./controllers/users/auth - implementação do acesso ao cadastro (com registro e redirecionamento para página de credenciais usando autenticação JWT)

### Implementando o upload e otimização de imagens

* ./controllers/users/profile - implementação do sistema de uploads e otimização de imagens

### Realizei os testes de consulta via Postman

> Ver documentação (exemplos) em http(s)://url:8191/
