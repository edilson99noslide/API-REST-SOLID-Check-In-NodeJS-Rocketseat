## GymApp - Aplicativo de check in para academias

### RFs - Requisitos funcionais

- [ ] Deve ser possível se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [ ] Deve ser possível o usuário obter seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas
- [ ] Deve ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível validar um check-in de um usuário
- [ ] Deve ser possível cadastrar uma academia

### RNs - Regras de negócio

- [ ] O usuário não deve poder se cadastrar com um e-mail que já existe
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in só pode ser validade até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

### RNFs - Requisitos não funcionais

- [ ] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação precisa estar persistidos em um banco PostgreSQL
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)

## Estrutura do projeto

### Instalações

- **Arquivo de dependências** `package.json`
```shell
npm init -y
```

- **TypeScript**
```shell
npm i typescript @types/node tsx tsup -D
```

- **Arquivo de config do TypeScript**: `tsconfig.json` alterar versão do es para 2022
```shell
npx tsc --init
```

```json
{
  "target": "es2025"
}
```

- **Fastify**
```shell
npm i fastify
```

- **Configuração do npm**: Crie um arquivo na raíz com o nome `.npmrc`, configurei ele para
aceitar somente versões dependências específicas, sem o uso de maior que
```text
save-exact=true
```

- **dotenv**: Responsável por carregar o arquivo `.env` e transformar isso em variáveis de ambiente
dentro do Node.js
```shell
npm i dotenv
```

- **zod**
```shell
npm i zod
```

## ORMs do Node.js

### TypeORM

Referência: [ORM | TypeORM](https://typeorm.io/)

### Sequelize

Referência: [ORM | Sequelize](https://sequelize.org/)

### Prisma

- **Instalação**
```shell
npm i prisma -D
```

- **Iniciando o prisma**
```shell
npx prisma init
```

- **Dependência de produção**: Responsável por poder trabalhar com as tipagens e "métodos" do primsa
```shell
npm i @prisma/client
```

- **Configurar import** `src/lib/prisma.ts`
```ts
export * from '../../generated/prisma';
```

- **Criar a tipagem do schema**: Cria de forma automatizada a tipagem do schema (integração com a tipagem do TypeScript)
```shell
npx prisma generat
```

- **Comandos**

| Comando                     | O que faz                                    |
|-----------------------------|----------------------------------------------|
| `npx prisma migrate dev`    | `Cria uma migration`                         |
| `npx prisma studio`         | `Cria uma interface do banco para navegador` |
| `npx prisma migrate deploy` | `Cria uma migration em produção`             |


- **Diagrama de tabelas**
```shell
npm install -D prisma-dbml-generator
```

1. Adicionar no final do arquivo `prisma/schema.prisma`
```text
generator dbml {
  provider = "prisma-dbml-generator"
  output   = "./dbml"
}
```

2. Comando
```shell
npx prisma generate
```

Referência: [ORM | Prisma](https://www.prisma.io/)

## Docker

### Como usar o docker

- **Rodando o PostgreSQL com Docker**
```shell
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest
```

1. Significa que deu certo: `LOG: database system is ready to accept connections`

- **Variáveis ambiente**

| Variáveis             | O que representa  |
|-----------------------|-------------------|
| `POSTGRESQL_USERNAME` | `Nome do usuário` |
| `POSTGRESQL_PASSWORD` | `Senha do banco`  |
| `POSTGRESQL_DATABASE` | `Nome do banco`   |

- **Flags**

| flags    | O que representa                                 |
|----------|--------------------------------------------------|
| `--name` | `nome`                                           |
| `-e`     | `adiciona variável ambiente`                     |
| `-p`     | `Porta (porta docker para porta host 5432:5432)` |

- **Comandos úteis**

| Comandos                        | O que representa                                                                       |
|---------------------------------|----------------------------------------------------------------------------------------|
| `docker ps`                     | `Lista todos os containers rodando`                                                    |
| `docker ps -a`                  | `Lista todos os containers que já criei em algum momento ordenado por data de criação` |
| `docker start nome-do-docker`   | `Inicia o docker`                                                                      |
| `docker stop nome-do-docker`    | `Pausa o docker`                                                                       |
| `docker rm nome-do-docker`      | `Excluir o docker`                                                                     |
| `docker logs nome-do-docker`    | `Mostra os logs do docker`                                                             |
| `docker logs -f nome-do-docker` | `Mantém os logs do docker no terminal`                                                 |
| `docker-compose up -d`          | `Rodando o docker pelo docker-compose.yml sem ficar exibindo os logs no terminal`      |
| `docker-compose down`           | `Parar a execução do docker e deleta o container`                                      |
| `docker-compose stop`           | `Parar a execução do docker`                                                           |

- **Variável ambiente da conexão** `.env`
```text
DATABASE_URL="postgresql://nome:senha@localhost:5432/nomeDoBanco?schema=public"
```

### Traduzindo o comando para `docker-compose.yml`

- **Comando do exemplo a cima**
```shell
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest
```

- **Arquivo** `docker-compose.yml`
```yaml
version: '3.8'

services:
  api-solid-pg:
    image: bitnami/postgresql:latest
    ports:
      - 5432:5432
    environment:
      - POSTGRESQL_USERNAME=docker
      - POSTGRESQL_PASSWORD=docker
      - POSTGRESQL_DATABASE=apisolid
```

- **Tradução**
1. `--name api-solid-pg` é o nome do serviço, loga abaixo de services
2. `bitnami/postgresql:latest` é a imagem
3. `-p 5432:5432` é a porta, fica logo abaixo de ports
4. tudo o que vem após a flag `-e` são as variáveis de ambiente e ficam logo abaixo de environment

Referencia: [Imagem Docker | bitname/postgres](https://hub.docker.com/r/bitnami/postgresql)

## Extras

### Bot para automatizar teste de versão de dependência

- **O que ele faz**: Esse bot fica tentando atualizar todas as dependências do projeto e roda os testes automatizados 
para validar se a aplicação continua funcionando normalmente após alterar, caso passe nos testes ele cria um PR no repositório
avisando que pode atualizar a dependência e se o teste falhar ele avisa para a gente exatamente onde falhou.

Referência: [Repositório | renovate](https://github.com/renovatebot/renovate)

### Criando aliases de importação `tsconfig.json`
```json
{
  "baseUrl": "./",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

### Hash de senha

- **bcryptjs**

1. Comando
```shell
npm i bcryptjs
npm i -D @types/bcryptjs
```

2. Importação
```ts
import { hash } from 'bcryptjs';
```

3. Como usar: use o método importado hash(), o seu primeiro parâmetro espera
o valor que será criptografado, no caso a `senha`, no segundo parâmetro espera o `round`
que é a quantidade de vezes que a senha será criptografada. **Cuidado!**: A quantidade
de rounds exige processamento, use moderadamente
```ts
const password_hash = await hash(password, 6);
```

Referência: [Hash de senha | bcryptjs](https://www.npmjs.com/package/bcryptjs)