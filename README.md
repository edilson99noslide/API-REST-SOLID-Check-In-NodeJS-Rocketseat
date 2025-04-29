## GymApp - Aplicativo de check in para academias

### RFs - Requisitos funcionais

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [ ] Deve ser possível o usuário obter seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas
- [ ] Deve ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível validar um check-in de um usuário
- [ ] Deve ser possível cadastrar uma academia

### RNs - Regras de negócio

- [x] O usuário não deve poder se cadastrar com um e-mail que já existe
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in só pode ser validade até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

### RNFs - Requisitos não funcionais

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisa estar persistidos em um banco PostgreSQL
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)

## Start do projeto

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

## Princípios SOLID

### D - Dependency Inversion Principle = Princípio da inversão de dependência

- **Conceitos**

1. Ela inverte a dependência, ao invés da classe instanciar as dependências que ela precisa
ela vai receber no parâmetro do construtor.

2. Todo service terá somente um método `handle` ou `execute` e um construtor

## Design Patterns

### Repository Pattern

- **Estrutura de arquivos** `src/repositories/prisma-model-repository.ts`

- **Benefício**: Manter os arquivos relacionados às comunicações com o banco de dados
oferece muitas vantagens

1. Exemplo 1: Se por exemplo eu queira alterar o ORM, de `prisma` para o `typeorm` o procedimento
seria mais fácil, isso torna os nossos testes mais fáceis de serem executados e focamos em somente nas funcionalidades do caso de uso

### In Memory Database

- **Estrutura de arquivos** `src/repositories/in-memory/in-memory-users-repository.ts`
```ts
import { UsersRepositoryInterface } from '@/repositories/users-repository';
import { User, Prisma } from 'generated/prisma';

export class InMemoryUsersRepository implements UsersRepositoryInterface {
  public items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email);

    if(!user) return null;

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      name: data.name,
      id: 'user-1',
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user);

    return user;
  }
}
```

- **Benefícios**: Quando precisamos executar um teste da aplicação, podemos utilizar
a representação do banco de dados salvo em memória, isso irá simplificar e 

Referência: [In Memory Database | Informação](https://martinfowler.com/bliki/InMemoryTestDatabase.html)

### System Under Test - SUT

- **Qual a finalidade**: A função do SUT é garantir o foco no pedaço do código que você quer garantir
que está funcionando corretamente

- **Modo de uso**: Nos testes unitários ou de integração a variável com o nome de sut é a que você precisa
realmente validar `src/use-cases/authenticate.spec.ts`
```ts
import { expect, describe, test } from 'vitest';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from '@/use-cases/authenticate';

describe('Authenticate tests', () => {
  test('Não deve ser possível autenticar na aplicação caso não exista o usuário cadastrado', async () => {
    await expect(
      () =>
        sut.handle({
          email: 'usuario-de-exemplo@gmail.com',
          password: '1234567',
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});

```

### Factory

- **Benefícios**: Como o nome já diz, ela assemelha a ideia de uma fábrica, ou seja, ela vai fabricar
o que precisa no contexto atual, fabricar várias dependências de repositórios é sua principal função
e é importante que ela não tenha nenhuma regra de negócio, somente as dependências.

- **Um exemplo**: Caso precise instanciar dependências de um register, ao invés de necessitar instanciar eles nos arquivos
basta chamar a função do factory que será responsável por instanciar as dependências.

- **Estrutura de arquivos** É opcional, mas seria legal utilizar no início do nome dos arquivos a palavra make 
`src/use-cases/factories/make-register-use-case.ts`
```ts
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "@/use-cases/register";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
```

## Estrutura do projeto

### Arquivos de erro

1. Path: `src/use-cases/errors/user-already-exists-error.ts`

2. Código
```ts
export class UserAlreadyExistsError extends Error { // estende do erro nativo do JavaScript
  constructor() {
    super('Já existe um usuário com esse e-mail cadastrado!');
  }
}
```

3. Como usar
```ts
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

// Exception
if(userExists) throw new UserAlreadyExistsError();

// Identificando erros específicos para disparar HTTP Status Code correto
if(error instanceof UserAlreadyExistsError) {
  return reply.status(409).send({ success : false, message: error.message });
}
```

### Handler de erros globais

1. Path: `src/app.ts`

2. Código: `setErrorHandler()` recebe no parâmetro `error`, `request` e `reply` 
```ts
app.setErrorHandler((error, _request, reply) => {
  // Erro específico do zod
  if(error instanceof ZodError) reply
    .status(404)
    .send({
      success: false,
      message: 'Ocorreu um erro na validação dos dados!',
      issues: error.format()
    });

  // Exibindo erro no console em ambientes que não sejam produção
  if(env.NODE_ENV !== 'prod') {
    console.error(error);
  } else {
    // TODO: Futuramente criar um log do erro em uma ferramenta externa de observabilidade, exemplo: DataDog/NewRelic/Sentry
  }

  // Retorno de erro genérico para erros na aplicação
  return reply.status(500).send({
    success: false,
    message: 'Ocorreu um erro interno!'
  });
});
```

## Testes automatizados

### Vitest

- **Instalação**
```shell
npm i vitest vite-tsconfig-paths -D
```

- **Arquivo de configuração** `vite.config.ts`
```ts
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';


export default defineConfig({
  plugins: [tsconfigPaths()],
});
```

- **Aliases para script de teste**
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- **Arquivos de teste** `src/use-cases/register.spec.ts`
```ts
import { expect, test } from 'vitest';

test('Testando se a configuração do vitest funcionou', () => {
  expect(2 + 2).toBe(4);
});
```

- **Gerar coverage de teste**: Coverage é uma representação visual dos testes, indicando
quantas vezes um teste passou por uma determinada linha do arquivo.

1. Crie o script em `package.json`
```json
{
  "scripts": {
    "test:coverage": "vitest run --coverage"
  }
}
```

2. Executando o teste com coverage
```shell
npm run teste:coverage
```

3. Solicitação da dependência, digite "y"
```text
MISSING DEPENDENCY  Cannot find dependency '@vitest/coverage-v8'
```

4. Local do arquivo gerado `coverage/index.html`

- **Usando o Vitest UI**

1. Comando
```shell
npm i -D @vitest/ui
```

2. Arquivo `package.json`
```json
{
  "scripts": {
    "test:ui": "vitest --ui"
  }
}
```

3. Comando
```shell
npm run test:ui
```

Referência: [Ferramenta de teste | vitest](https://vitest.dev/)

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