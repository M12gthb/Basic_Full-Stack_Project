# Criar nova migração

npm run typeorm migration:generate ./src/migrations/{nomeMigração} -- -d ./src/data-source.ts

# Executando nova migração

npm run typeorm migration:run -- -d ./src/data-source

# Reverter migração

npm run typeorm migration:revert -- -d ./src/data-source

# Criação do mySQL

1 - CREATE DATABASE IF NOT EXISTS <databaseName>;

2 - CREATE USER IF NOT EXISTS '<username>'@'<host>' IDENTIFIED BY '<password>';

3 - GRANT ALL PRIVILEGES ON <databaseName>.\* TO '<username>'@'<host>';

4 - FLUSH PRIVILEGES;
