# Criar nova migração

npm run typeorm migration:generate ./src/migrations/{nomeMigração} -- -d ./src/data-source.ts

# Executando nova migração

npm run typeorm migration:run -- -d ./src/data-source

# Reverter migração

npm run typeorm migration:revert -- -d ./src/data-source
