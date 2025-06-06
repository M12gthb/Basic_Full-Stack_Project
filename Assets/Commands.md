## Comandos do node

- Iniciando o node: **npm init -y**

- Instalando pacotes: **npm install <nome_do_pacote>**

## Integração com banco de dados

- Instalando metadata: **npm install reflect-metadata --save**

- Instalando SGBD(Sistema gerênciador de banco de dados): **npm install pg --save** ou **npm install mysql**

- Dotenv: **npm i -S typeorm reflect-metadata dotenv pg**

- Gerando Migrações: **npm run typeorm migration:generate ./src/migrations/InitialMigration -- -d ./src/data-source.ts**

- Executando Migrções: **npm run typeorm migration:run -- -d ./src/data-source**

- Revertendo migrações: **npm run typeorm migration:revert -- -d ./src/data-source**

## Comandos do git

- Adicionando feat: git add .

- Adicionando nome do commit: git commit -m"nome do commit"

- Mandando para repositório remoto: git push

- Trazendo atualizações: git branch origin/main

- Fazendo push de atualizações: git pull

#### Tipos de commits: https://github.com/iuricode/padroes-de-commits

#### Documentação W3School: https://www.w3schools.com/

#### Documentação MDN: https://developer.mozilla.org/pt-BR/
