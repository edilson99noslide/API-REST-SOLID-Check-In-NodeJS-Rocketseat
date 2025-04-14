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